import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../shared/services/api/api.service";
import { CryptoService } from "../../shared/services/crypto/crypto.service";

@Component({
  selector: "app-diseases",
  templateUrl: "./diseases.component.html",
  styleUrls: ["./diseases.component.scss"]
})
export class DiseasesComponent implements OnInit {
  patient = JSON.parse(<string>sessionStorage.getItem("patient"));
  current_hospital = JSON.parse(<string>localStorage.getItem("hospital"));

  scannerToggled = false;

  secret_keys: any = [];

  diseases: any = {
    encrypted: [],
    decrypted: []
  };

  constructor(
    private api: ApiService,
    private Crypto: CryptoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.patient.ecdh = {
      public_key: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key)
    };

    await this.get_diseases();
  }

  /**
   * Get patient's diseases from DDB
   */
  async get_diseases(): Promise<void> {
    const observable = {
      next: (response: any) => this.diseases.encrypted = response,
      error: (err: Error) => console.error(err),
      complete: async () => {
        subscription.unsubscribe();
        await this.decrypt_local_diseases();
      }
    };

    const subscription = this.api.get(`patients/${this.patient.bc_address}/diseases`)
      .subscribe(observable);
  }

  /**
   * Decrypt the diseases from local hospital
   */
  async decrypt_local_diseases() {
    this.current_hospital.ecdh = {
      private_key: await this.Crypto.ECDH.importPrivateKey(this.current_hospital.ecdh_private_key)
    };

    const secret_key = await this.Crypto.ECDH.computeSecret(this.current_hospital.ecdh.private_key, this.patient.ecdh.public_key);

    this.pushSessionKey(this.current_hospital.bc_address, secret_key);

    await this.decrypt(this.current_hospital.bc_address);
  }

  /**
   * Decrypt all diseases in a hospital
   * @param bc_address Hospital blockchain address
   */
  async decrypt(bc_address: string): Promise<void> {
    const i = this.diseases.encrypted.findIndex((e: any) => {
      return e.hospital.bc_address == bc_address;
    });

    const ciphers = this.diseases.encrypted[i].diseases;
    const hospital = this.diseases.encrypted[i].hospital;

    for (let j = 0; j < ciphers.length; j++) {
      const sk_disease = await this.Crypto.Hash.SHA512(hospital.ecdh_secret_key + ciphers[j].nonce, true),
        disease_name = this.Crypto.AES.decrypt(
        ciphers[j].name,
        sk_disease,
        this.patient.iv
      );

      ciphers[j].sk_disease = sk_disease;
      this.group_decrypted(disease_name, hospital, ciphers[j]);
    }

    this.diseases.encrypted.splice(i, 1);
  }

  /**
   * Group the hospitals & ciphers by the decrypted diseases name
   * @param disease_name decrypted disease name
   * @param hospital hospital object
   * @param cipher original disease cipher
   */
  group_decrypted(disease_name: string, hospital: any, cipher: any) {
    let index = this.diseases.decrypted.findIndex((e: any) => {
      return e.name == disease_name;
    });
    console.log(disease_name)
    console.log(cipher)

    cipher.hospital = hospital;
    if (index == -1) {
      const group = {
        name: disease_name,
        ciphers: [cipher]
      };

      this.diseases.decrypted.push(group);
    } else {
      this.diseases.decrypted[index].ciphers.push(cipher);
    }
  }

  async getSessionKey(qrData: any) {
    this.toggleQrScanner();
    console.log(JSON.parse(<string>qrData).bc);

    const json: any = JSON.parse(<string>qrData);
    this.pushSessionKey(json.bc, json.sk);
    await this.decrypt(json.bc);
  }

  pushSessionKey(bc_address: string, secret_key: string) {
    const object = {
      bc_address: bc_address,
      secret_key: secret_key
    };

    if (this.secret_keys.indexOf(object) == -1) {
      this.secret_keys.push(object);
    }

    sessionStorage.setItem("session-keys", JSON.stringify(this.secret_keys));

    const i = this.diseases.encrypted.findIndex((e: any) => {
      return e.hospital.bc_address == bc_address;
    });

    this.diseases.encrypted[i].hospital.ecdh_secret_key = secret_key;
  }

  toggleQrScanner() {
    this.scannerToggled = !this.scannerToggled;
  }


  // patient_dob(){
  //   var date = sessionStorage.getItem('patient', 'dob')
  //   var patientTimezone = date.getTimezoneOffset() * 60000;
  //   new Date(date.getTime() - patientTimezone);
  // }
}
