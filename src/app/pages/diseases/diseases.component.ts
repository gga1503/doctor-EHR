import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/services/api/api.service';
import {CryptoService} from '../../shared/services/crypto/crypto.service';
import {AlertService} from "../../shared/services/alert/alert.service";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {
  patient = JSON.parse(<string>sessionStorage.getItem('patient'));
  hospital = JSON.parse(<string>localStorage.getItem('hospital'));

  scannerToggled = false;

  secret_keys: any = []

  diseases: any = {
    encrypted: [],
    decrypted: []
  }

  constructor(
    private api: ApiService,
    private Crypto: CryptoService,
    private alert: AlertService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.patient.ecdh = {
      public_key: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key)
    }

    await this.getDiseases()
  }

  onOpenAlert() {
    this.alert.confirmationAlert({
      image: "assets/images/lockopen.svg",
      title: 'Access Accepted!',
      information: 'Health Record has been successfully unlocked'
    })
      .subscribe(_ => {
        setTimeout(() => {
          this.alert.close()
        }, 4000)
      });
  }

  /**
   * Decrypt all diseases in a hospital
   * @param bc_address Hospital blockchain address
   */
  async decrypt(bc_address: string): Promise<void> {
    const i = this.diseases.encrypted.findIndex((e: any) => {
      return e.hospital.bc_address == bc_address
    })

    const ciphers = this.diseases.encrypted[i].diseases
    const hospital = this.diseases.encrypted[i].hospital

    for (let j = 0; j < ciphers.length; j++) {
      const sk_disease = await this.Crypto.Hash.SHA512(hospital.ecdh_secret_key + ciphers[j].nonce, true),
        diseaseName = this.Crypto.AES.decrypt(
          ciphers[j].name,
          sk_disease,
          this.patient.iv
        )

      ciphers[j].sk_disease = sk_disease
      this.groupDecrypted(diseaseName, hospital, ciphers[j])
    }

    this.diseases.encrypted.splice(i, 1)
  }

  /**
   * Get patient's diseases from DDB
   */
  async getDiseases(): Promise<void> {
    const observable = {
      next: async (response: any) => {
        if (response.length > 0) {
          this.diseases.encrypted = response
          await this.decryptLocalDiseases()
        } else {
          sessionStorage.setItem('diseases', JSON.stringify({'local': []}))
        }
      },
      error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }

    const subscription = this.api.get(`patients/${this.patient.bc_address}/diseases`)
      .subscribe(observable)
  }

  /**
   * Decrypt the diseases from local hospital
   */
  async decryptLocalDiseases() {
    this.hospital.ecdh = {
      private_key: await this.Crypto.ECDH.importPrivateKey(this.hospital.ecdh_private_key)
    }

    const secret_key = await this.Crypto.ECDH.computeSecret(this.hospital.ecdh.private_key, this.patient.ecdh.public_key)

    this.pushSessionKey(this.hospital.bc_address, secret_key)

    await this.decrypt(this.hospital.bc_address)

    const diseases = []
    for (let disease of this.diseases.decrypted) {
      diseases.push({
        name: disease.name,
        cipher: disease.ciphers[0].name,
        nonce: disease.ciphers[0].nonce,
        _id: disease.ciphers[0]._id
      })
    }
    sessionStorage.setItem('diseases', JSON.stringify({'local': diseases}))
  }

  /**
   * Group the hospitals & ciphers by the decrypted diseases name
   * @param diseaseName decrypted disease name
   * @param hospital hospital object
   * @param cipher original disease cipher
   */
  groupDecrypted(diseaseName: string, hospital: any, cipher: any) {
    let index = this.diseases.decrypted.findIndex((e: any) => {
      return e.name == diseaseName
    })

    cipher.hospital = hospital
    if (index == -1) {
      this.diseases.decrypted.push({
        name: diseaseName,
        ciphers: [cipher]
      })
    } else {
      this.diseases.decrypted[index].ciphers.push(cipher)
    }

    if (hospital.bc_address != environment.hospital_bc_address) {
      this.onOpenAlert()
    }
  }

  async getSessionKey(qrData: any) {
    this.toggleQrScanner()

    const json: any = JSON.parse(<string>qrData)
    this.pushSessionKey(json.bc, json.sk)
    await this.decrypt(json.bc)
  }

  pushSessionKey(bc_address: string, secret_key: string) {
    const object = {
      bc_address: bc_address,
      secret_key: secret_key
    }

    if (this.secret_keys.indexOf(object) == -1) {
      this.secret_keys.push(object)
    }

    sessionStorage.setItem('session-keys', JSON.stringify(this.secret_keys))

    const i = this.diseases.encrypted.findIndex((e: any) => {
      return e.hospital.bc_address == bc_address
    })

    this.diseases.encrypted[i].hospital.ecdh_secret_key = secret_key
  }

  toggleQrScanner() {
    this.scannerToggled = !this.scannerToggled;
  }
}
