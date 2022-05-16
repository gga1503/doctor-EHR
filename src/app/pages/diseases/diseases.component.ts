import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/services/api/api.service';
import {CryptoService} from '../../shared/services/crypto/crypto.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {

  patient = JSON.parse(<string>sessionStorage.getItem('patient'));
  hospitals = [
    JSON.parse(<string>localStorage.getItem('hospital'))
  ]

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
        this.diseases.encrypted = response

        // console.log('records:', this.records)
        // await this.decrypt(this.hospitals[0])
      })
  }

  async decrypt(hospital: any) {
    for (let i = 0; i < this.diseases.encrypted.length; i++) {
      if (this.diseases.encrypted[i].hospital.bc_address == hospital.bc_address) {
        const diseases = this.diseases.encrypted[i].diseases

        for (let j = 0; j < diseases.length; j++) {
          diseases[j].cipher = diseases[j].name //Keep the temporary cipher

          const session_key = await this.Crypto.Hash.SHA512(hospital.ecdh.secret_key + diseases[j].date, true)

          diseases[j].name = this.Crypto.AES.decrypt(
            diseases[j].name,
            session_key
          )
        }

        this.diseases.decrypted.push({
          hospital: hospital,
          diseases: this.diseases.encrypted[i].diseases
        })

        break;
      }
    }
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


  // patient_dob(){
  //   var date = sessionStorage.getItem('patient', 'dob')
  //   var patientTimezone = date.getTimezoneOffset() * 60000;
  //   new Date(date.getTime() - patientTimezone);
  // }
}
