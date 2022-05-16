import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api/api.service";
import {CryptoService} from "../../../shared/services/crypto/crypto.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  patient = JSON.parse(<string>sessionStorage.getItem('patient'));
  hospitals = [
    JSON.parse(<string>localStorage.getItem('hospital'))
  ]

  records: any = {
    encrypted: [],
    decrypted: []
  }

  constructor(
    private api: ApiService,
    private Crypto: CryptoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.generateKeys()

    await this.get_records()

    // this.decrypt(this.hospitals[0])
    // this.get_ciphers(this.patient.bc_address)
    //
    // // Append hospitals array with local hospital from local Storage
    // this.hospitals.push(JSON.parse(<string>localStorage.getItem('hospital')))

    // sessionStorage.setItem('secret_keys', JSON.stringify())
  }

  get_records(): void {
    this.api.get(`patients/${this.patient.bc_address}/diseases`).subscribe(
      async response => {
        this.records.encrypted = response


        await this.decrypt(this.hospitals[0])
      })
  }

  // patient_dob(){
  //   var date = sessionStorage.getItem('patient', 'dob')
  //   var patientTimezone = date.getTimezoneOffset() * 60000;
  //   new Date(date.getTime() - patientTimezone);
  // }

  async decrypt(hospital: any) {
    for (let i = 0; i < this.records.encrypted.length; i++) {
      if (this.records.encrypted[i].hospital.bc_address == hospital.bc_address) {
        const diseases = this.records.encrypted[i].diseases

        for (let j = 0; j < diseases.length; j++) {
          diseases[j].name = this.Crypto.AES.decrypt(
            diseases[j].name,
            await this.Crypto.Hash.SHA512(hospital.ecdh.secret_key + diseases[j].date, true)
          )
        }

        this.records.decrypted.push({
          hospital: hospital,
          diseases: this.records.encrypted[i].diseases
        })

        break;
      }
    }

    console.log('diseases:', this.records.decrypted)
    // for (let i = 0; i < diseases.length; i++){
    //   const session_key = this.Crypto.Hash.SHA512(hospital.ecdh.secret_key + diseases[i].date)
    //
    // }

  }

  async generateKeys() {
    this.patient.ecdh = {
      public_key: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key, 'P-256')
    }

    this.hospitals[0].ecdh = {
      public_key: await this.Crypto.ECDH.importPublicKey(this.hospitals[0].ecdh_public_key, 'P-256'),
      private_key: await this.Crypto.ECDH.importPrivateKey(this.hospitals[0].ecdh_private_key, 'P-256')
    }

    this.hospitals[0].ecdh.secret_key = await this.Crypto.ECDH.computeSecret(
      this.hospitals[0].ecdh.private_key, this.patient.ecdh.public_key
    )
  }


  get_session_key(hospital: String) {
  }
}
