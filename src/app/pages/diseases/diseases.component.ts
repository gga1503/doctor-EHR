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
    this.patient.ecdh = {
      public_key: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key, 'P-256')
    }

    // console.log()
    await this.generateHospitalKeys(this.hospitals[0])
    console.log(this.hospitals[0])
    await this.get_records()

    await this.check_patient_decrypt()
  }

  async get_records(): Promise<void> {
    this.api.get(`patients/${this.patient.bc_address}/diseases`).subscribe(
      async response => {
        this.diseases.encrypted = response

        await this.decrypt(this.hospitals[0])
      })
  }

  async decrypt(hospital: any): Promise<void> {
    const i = this.diseases.encrypted.findIndex((e: any) => {
        return e.hospital.bc_address == hospital.bc_address
      }
    )

    const ciphers = this.diseases.encrypted[i]

    // console.log('hospital', hospital)
    for (let j = 0; j < ciphers.diseases.length; j++) {
      const disease_name = this.Crypto.AES.decrypt(
        ciphers.diseases[j].name,
        hospital.ecdh.secret_key,
        this.patient.iv
      )

      this.push_decrypted(disease_name, hospital)
    }

    this.diseases.encrypted.splice(i, 1)
  }

  push_decrypted(disease_name: string, hospital: any) {
    let group = this.diseases.decrypted.find((e: any) => {
      return e.group.disease.name = disease_name
    })

    if (!group) {
      group = {
        disease: {name: disease_name},
        hospitals: [hospital]
      }

      this.diseases.decrypted.push(group)
    }
  }

  async generateHospitalKeys(hospital: any) {
    hospital.ecdh = {
      private_key: await this.Crypto.ECDH.importPrivateKey(hospital.ecdh_private_key, 'P-256')
    }

    // console.log('hospital private key', hospital.ecdh.private_key)
    // console.log('this.hospital private key', this.hospitals[0].ecdh.private_key)
    const ecdh_secret = await this.Crypto.ECDH.computeSecret(hospital.ecdh.private_key, this.patient.ecdh.public_key)
    // console.log('this.hospitals', this.hospitals[0])
    // console.log('hospital', hospital)
    hospital.ecdh.secret_key = await this.Crypto.Hash.SHA512(ecdh_secret, true)
  }

  get_session_key(cipher: any, hospital: String) {
  }

  async check_patient_decrypt() {
    const patient = this.patient
    patient.ecdh_private_key = "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgw+rDCZnzRCNqqhLatYv2LVlAMQHrSmpbkpadE5jfbrahRANCAATyiIVnvpjAcF1diQsyCPK23opmj74dM57iRIyJRgu9N0+PKS+q7qF/+xtxrnBv+x8hKT2vOVwsSVVyEbLRDbFH"

    patient.ecdh = {
      public_key: await this.Crypto.ECDH.importPublicKey(patient.ecdh_public_key, 'P-256'),
      private_key: await this.Crypto.ECDH.importPrivateKey(patient.ecdh_private_key, 'P-256')
    }

    const hospital = this.hospitals[0]

    hospital.ecdh.public_key = await this.Crypto.ECDH.importPublicKey(hospital.ecdh_public_key, 'P-256')

    const ecdh_secret = await this.Crypto.ECDH.computeSecret(patient.ecdh.private_key, hospital.ecdh.public_key)

    const secret_key = await this.Crypto.Hash.SHA512(ecdh_secret, true)
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
