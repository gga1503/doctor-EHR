import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/services/api/api.service';
import {CryptoService} from '../../shared/services/crypto/crypto.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {
  patient = JSON.parse(<string>sessionStorage.getItem('patient'));
  current_hospital = JSON.parse(<string>localStorage.getItem('hospital'));

  cathay_hospital = {
    bc: "0x721574b0a2a4E8f3b61eAC2edEa4D39Ff831270a",
    sk: "IVpLqGHSRtW0OHsgrdqA7ZcGJvlkOEXEalQ2I+eslztnLdbeQfZQeZw3rxkJbLUxnmHuC3YeO5wzxdBjQfVrrg=="
  }

  secret_keys: any = []

  diseases_subscription: any

  diseases: any = {
    encrypted: [],
    decrypted: []
  }

  constructor(
    private api: ApiService,
    private Crypto: CryptoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.patient.ecdh = {
      public_key: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key)
    }

    await this.get_diseases()

    await this.get_secret_key(this.cathay_hospital)
  }

  async get_diseases(): Promise<void> {
    const observable = {
      next: (response: any) => this.diseases.encrypted = response,
      error: (err: Error) => console.error(err),
      complete: async () => {
        this.diseases_subscription.unsubscribe()
        await this.decrypt_local_diseases()
      }
    }

    this.diseases_subscription = this.api.get(`patients/${this.patient.bc_address}/diseases`)
      .subscribe(observable)
  }

  async decrypt_local_diseases() {
    this.current_hospital.ecdh = {
      private_key: await this.Crypto.ECDH.importPrivateKey(this.current_hospital.ecdh_private_key)
    }

    const secret_key = await this.Crypto.ECDH.computeSecret(this.current_hospital.ecdh.private_key, this.patient.ecdh.public_key)

    this.add_secret_key(this.current_hospital.bc_address, secret_key)

    await this.decrypt(this.current_hospital.bc_address)
  }

  async decrypt(bc_address: any): Promise<void> {
    const i = this.diseases.encrypted.findIndex((e: any) => {
      return e.hospital.bc_address == bc_address
    })

    const ciphers = this.diseases.encrypted[i].diseases
    const hospital = this.diseases.encrypted[i].hospital

    for (let j = 0; j < ciphers.length; j++) {
      const disease_name = this.Crypto.AES.decrypt(
        ciphers[j].name,
        hospital.ecdh_secret_key,
        this.patient.iv
      )

      this.push_decrypted(disease_name, hospital, ciphers[j])
    }

    this.diseases.encrypted.splice(i, 1)
  }

  push_decrypted(disease_name: string, hospital: any, cipher: any) {
    let index = this.diseases.decrypted.findIndex((e: any) => {
      return e.disease.name == disease_name
    })

    if (index == -1) {
      const group = {
        disease: {name: disease_name},
        hospitals: [{hospital, cipher}]
      }

      this.diseases.decrypted.push(group)
    } else {
      this.diseases.decrypted[index].hospitals.push({hospital, cipher})
    }
  }

  async get_secret_key(json: any) {
    console.log(this.diseases)
    this.add_secret_key(json.bc, json.sk)

    // await this.decrypt(bc_address)
  }

  add_secret_key(bc_address: string, secret_key: string) {
    const object = {
      bc_address: bc_address,
      secret_key: secret_key
    }

    if (this.secret_keys.indexOf(object) == -1) {
      this.secret_keys.push(object)
    }

    const i = this.diseases.encrypted.findIndex((e: any) => {
      console.log(e)
      console.log('address', bc_address)
      return e.hospital.bc_address == bc_address
    })

    // console.log('hospital bc address', bc_address)
    console.log('index', i)

    this.diseases.encrypted[i].hospital.ecdh_secret_key = secret_key
  }

  // patient_dob(){
  //   var date = sessionStorage.getItem('patient', 'dob')
  //   var patientTimezone = date.getTimezoneOffset() * 60000;
  //   new Date(date.getTime() - patientTimezone);
  // }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
