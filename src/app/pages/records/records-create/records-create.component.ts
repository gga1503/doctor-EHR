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
    diagnose: 'Fever and sore throat'
  })

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private Crypto: CryptoService,
    private route: Router) {
  }

  ngOnInit() {
  }

  async generateSecretKey() {
    this.hospital.ecdh = {
      privateKey: await this.Crypto.ECDH.importPrivateKey(this.hospital.ecdh_private_key, "P-256"),
      publicKey: await this.Crypto.ECDH.importPublicKey(this.hospital.ecdh_public_key, "P-256")
    }

    this.patient.ecdh = {
      publicKey: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key, "P-256")
    }

    const secretKey = await this.Crypto.ECDH.computeSecret(this.hospital.ecdh.privateKey, this.patient.ecdh.publicKey)
      // + this.data.date

    return await this.Crypto.Hash.SHA512(secretKey, true)
  }

  generateCipher(secret_key: string) {
    this.data.cipher = {
      disease: this.Crypto.AES.encrypt(this.record.value.disease, secret_key, this.patient.iv),
      diagnose: this.Crypto.AES.encrypt(this.record.value.diagnose, secret_key)
    }
  }

  async generateMetadata() {
    this.data.metadata = {
      disease: await this.Crypto.Hash.SHA512(this.data.cipher.disease, true),
      diagnose: await this.Crypto.Hash.SHA512(this.data.cipher.diagnose, true)
    }
  }

  async submit() {
    if (this.patient) {
      // await this.api.get('time').subscribe(
      //   response => sessionStorage.setItem('timestamp', response)
      // )

      // this.data.date = sessionStorage.getItem('timestamp')

      const secret_key = await this.generateSecretKey()

      this.generateCipher(secret_key)

      await this.generateMetadata()

      // console.log('data:', this.data)
      this.api.post('records', this.data).subscribe(
        response => {
          this.route.navigate(['/records'])
        }
      )
    }
  }
}
