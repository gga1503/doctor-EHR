import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api/api.service";
import {CryptoService} from "../../../shared/services/crypto/crypto.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  @Input() qrResult = '0xafeEb9069Aafc36473234829d00061502bB21ED9' // patient's blockchain address

  patient: any;

  records: any = {
    encrypted: [],
    decrypted: []
  }

  hospitals: Array<any> = []

  constructor(
    private api: ApiService,
    private Crypto: CryptoService
  ) {
  }

  ngOnInit(): void {
    this.get_patient(this.qrResult)
    // this.get_records()

    // this.generateKeys()

    // this.get_patient(this.qrResult)
    //
    // this.get_ciphers(this.patient.bc_address)
    //
    // // Append hospitals array with local hospital from local Storage
    // this.hospitals.push(JSON.parse(<string>localStorage.getItem('hospital')))


    // sessionStorage.setItem('secret_keys', JSON.stringify())
  }

  get_patient(address: String): void {
    this.api.get('patients/' + address).subscribe(
      patient => sessionStorage.setItem('patient', JSON.stringify(patient))
    )

    this.patient = JSON.parse(<string>sessionStorage.getItem('patient'))
  }

  get_records(): void {
    this.api.get(`patients/${this.patient.bc_address}/diseases`).subscribe(
      response => {
        this.records.encrypted = response

        console.log(this.records, response.status)
      })
  }
  //
  // patient_dob(){
  //   var date = sessionStorage.getItem('patient', 'dob')
  //   var patientTimezone = date.getTimezoneOffset() * 60000;
  //   new Date(date.getTime() - patientTimezone);
  // }

  decrypt(hospital: String) {

  }

  computeSecret() {

  }

  generateKeys() {
    console.log(this.Crypto.ECDH.generateKeys())
  }


  get_session_key(hospital: String) {
  }
}
