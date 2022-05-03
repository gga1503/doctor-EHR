import {Component, Input, OnInit} from '@angular/core';
import {CryptoService} from '../../../shared/services/crypto/crypto.service';
import {ApiService} from "../../../shared/services/api/api.service";
import Hospital from "../../../simulation/data/hospital.json";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-records-create',
  templateUrl: './records-create.component.html',
  styleUrls: ['./records-create.component.scss']
})
export class RecordsCreateComponent implements OnInit {
  @Input() patient_bc_address: String | undefined = '0xafeEb9069Aafc36473234829d00061502bB21ED9'
  hospital: any = Hospital

  patient: any;
  data = {
    bc_addresses: {
      doctor: '0xc8f8Bb2E550D8163a3964Fb0A65c92a04646B577',
      hospital: this.hospital.bc_address,
      patient: '0xafeEb9069Aafc36473234829d00061502bB21ED9',
    },
    cipher: {
      disease: '',
      diagnose: ''
    },
    metadata: {
      disease: '',
      diagnose: ''
    }
  }

  record = this.formBuilder.group({
    disease: 'Diabetes',
    diagnose: 'Kebanyakan gula'
  })

  constructor(private formBuilder: FormBuilder, private api: ApiService, private Crypto: CryptoService) {
  }

  ngOnInit() {
  }

  get_patient(address: String): void {
    this.api.get('patients/' + address).subscribe(
      async response => {
        this.patient = response.data
        this.patient.ecdh = {}
        this.patient.ecdh.iv = "AT8jTu6lyuG+fg=="

        const secret_key = await this.generateSecretKey()
        this.generateCipher(secret_key, this.patient.ecdh.iv)

        await this.generateMetadata()

        this.api.post('records', this.data).subscribe(
          response => console.log(response)
        )
        // console.log(this.decryptCipher(secret_key, this.patient.ecdh.iv))
      }
    )
  }

  async generateSecretKey() {
    this.hospital.ecdh = {}

    this.hospital.ecdh.privateKey = await this.Crypto.ECDH.importPrivateKey(this.hospital.ecdh_private_key, "P-256")
    this.hospital.ecdh.publicKey = await this.Crypto.ECDH.importPublicKey(this.hospital.ecdh_public_key, "P-256")

    this.patient.ecdh.publicKey = await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key, "P-256")

    const secretKey = await this.Crypto.ECDH.computeSecret(this.hospital.ecdh.privateKey, this.patient.ecdh.publicKey)

    return await this.Crypto.Hash.SHA512(secretKey, true)
  }

  generateCipher(secret_key: string, iv: string){
    this.data.cipher.disease = this.Crypto.AES.encrypt(this.record.value.disease, secret_key, iv)
    this.data.cipher.diagnose = this.Crypto.AES.encrypt(this.record.value.diagnose, secret_key)
  }

  async generateMetadata() {
    this.data.metadata.disease = await this.Crypto.Hash.SHA512(this.data.cipher.disease, true)
    this.data.metadata.diagnose = await this.Crypto.Hash.SHA512(this.data.cipher.diagnose, true)
  }

  decryptCipher(secretKey: string, iv: string){
    return {
      disease: this.Crypto.AES.decrypt(this.data.cipher.disease, secretKey, iv),
      diagnose: this.Crypto.AES.decrypt(this.data.cipher.diagnose, secretKey)
    }
  }

  submit() {
    if (this.patient_bc_address) {
      this.get_patient(this.patient_bc_address)
    }
  }
}
