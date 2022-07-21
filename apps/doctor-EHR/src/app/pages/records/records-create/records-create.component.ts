import {Component, Input, OnInit} from '@angular/core';
import {CryptoService} from '../../../shared/services/crypto/crypto.service';
import {ApiService} from "../../../shared/services/api/api.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-records-create',
  templateUrl: './records-create.component.html',
  styleUrls: ['./records-create.component.scss']
})
export class RecordsCreateComponent implements OnInit {
  @Input() qrResult: string = '0xafeEb9069Aafc36473234829d00061502bB21ED9'

  hospital = JSON.parse(<string>localStorage.getItem('hospital'))
  doctor = JSON.parse(<string>localStorage.getItem('doctor'))
  patient = JSON.parse(<string>sessionStorage.getItem('patient'))

  data: any = {
    bc_addresses: {
      doctor: this.doctor.bc_address,
      hospital: this.hospital.bc_address,
      patient: this.patient.bc_address,
    }
  }

  record = this.formBuilder.group({
    disease: 'Covid-19',
    diagnose: 'Test input disease of Covid #1'
  })

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private Crypto: CryptoService,
    private route: Router) {
  }

  ngOnInit() {
  }

  async createKeys() {
    this.hospital.ecdh = {privateKey: await this.Crypto.ECDH.importPrivateKey(this.hospital.ecdh_private_key)}

    this.patient.ecdh = {publicKey: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key)}

    const masterKey = await this.Crypto.ECDH.computeSecret(this.hospital.ecdh.privateKey, this.patient.ecdh.publicKey),
      nonce = await this.Crypto.Hash.SHA512(this.data.bc_addresses.patient + this.data.bc_addresses.hospital + this.data.date, true),
      diseaseKey = await this.Crypto.Hash.SHA512(masterKey + nonce, true),
      diagnoseKey = await this.Crypto.Hash.SHA512(diseaseKey + this.data.date, true)

    return {
      disease: diseaseKey,
      diagnose: diagnoseKey
    }
  }

  async createCipher(keys: any) {
    this.data.cipher = {
      disease: this.Crypto.AES.encrypt(<string>this.record.value.disease, keys.disease, this.patient.iv),
      diagnose: this.Crypto.AES.encrypt(<string>this.record.value.diagnose, keys.diagnose)
    }

    await this.createMetadata()
  }

  async createMetadata() {
    this.data.metadata = {
      disease: await this.Crypto.Hash.SHA512(this.data.cipher.disease, true),
      diagnose: await this.Crypto.Hash.SHA512(this.data.cipher.diagnose, true)
    }

    this.post_record()
  }

  async submit() {
    if (this.patient)
      this.get_timestamp()
  }

  get_timestamp() {
    let subscription: any;

    const observable = {
      next: (response: any) => this.data.date = response,
      error: (err: Error) => console.error(err),
      complete: async () => {
        subscription.unsubscribe()
        const keys = await this.createKeys()
        await this.createCipher(keys)
      }
    }

    subscription = this.api.get('time').subscribe(observable)
  }

  post_record() {
    const observable = {
      next: (response: any) => console.log(response),
      error: (err: Error) => console.error(err),
      complete: async () => {
        subscription.unsubscribe()
        await this.route.navigate(['diseases'])
      }
    }

    const subscription = this.api.post('records', this.data).subscribe(observable)
  }
}
