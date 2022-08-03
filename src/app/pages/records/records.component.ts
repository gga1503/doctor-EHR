import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api/api.service";
import {Router} from '@angular/router';
import {CryptoService} from '../../shared/services/crypto/crypto.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})

export class RecordsComponent implements OnInit {
  ciphers = JSON.parse(<string>sessionStorage.getItem('disease-ciphers'))
  disease = JSON.parse(<string>sessionStorage.getItem('disease'))
  patient = JSON.parse(<string>sessionStorage.getItem('patient'))
  records: any

  constructor(
    private api: ApiService,
    private Crypto: CryptoService,
    private router: Router,
    private location: Location
  ) {
  }

  async ngOnInit() {
    await this.getRecords()
  }

  previousPage() {
    this.location.back();
  }

  async getRecords() {
    const params: any = {'diseases': []}

    this.ciphers.forEach((cipher: any) => {
      params.diseases.push(cipher._id);
    })

    const observable = {
      next: (response: any) => {
        this.records = response
        this.records.forEach((record: any) => this.getHospital(record))
      },
      error: (err: Error) => console.error(err),
      complete: async () => subscription.unsubscribe()
    }

    const subscription = this.api.get(`records`, params).subscribe(observable)
  }

  getHospital(record: any) {
    this.ciphers.forEach((cipher: any) => {
      if (cipher._id == record.disease_id) {
        record.hospital = {
          name: cipher.hospital.name,
          secretKey: cipher.hospital.ecdh_secret_key
        }
      }
    })
  }

  async show(i: any) {
    const record = this.records[i]
    record.decipher = this.Crypto.AES.decrypt(record.diagnose, record.hospital.secretKey, this.patient.salt)
    sessionStorage.setItem('record', JSON.stringify(record))
    await this.router.navigate(['records/show'])
  }
}
