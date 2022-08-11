import {Component, OnInit} from '@angular/core';
import {CryptoService} from '../../../shared/services/crypto/crypto.service';
import {ApiService} from "../../../shared/services/api/api.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {PopUpService} from "../../../shared/services/pop-up/pop-up.service";
import {AlertService} from "../../../shared/services/alert/alert.service";

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {
  hospital = JSON.parse(<string>localStorage.getItem('hospital'))
  doctor = JSON.parse(<string>localStorage.getItem('doctor'))
  patient = JSON.parse(<string>sessionStorage.getItem('patient'))
  diseases = JSON.parse(<string>sessionStorage.getItem('diseases')).local

  data: any = {
    bc_addresses: {
      doctor: this.doctor.bc_address,
      hospital: this.hospital.bc_address,
      patient: this.patient.bc_address,
    }
  }

  record = this.formBuilder.group({
    disease: '',
    diagnose: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private Crypto: CryptoService,
    private route: Router,
    private location: Location,
    private dialog: PopUpService,
    private alert: AlertService) {
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  async generateSessionKeys() {
    this.hospital.ecdh = {
      privateKey: await this.Crypto.ECDH.importPrivateKey(this.hospital.ecdh_private_key)
    }

    this.patient.ecdh = {
      publicKey: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key)
    }

    const disease = this.diseases.find((disease: any) => disease.name == this.record.value.disease),
      nonce = disease ? disease.nonce : await this.Crypto.Hash.SHA512(this.data.bc_addresses.patient + this.data.bc_addresses.hospital + this.data.date, true),
      masterKey = await this.Crypto.ECDH.computeSecret(this.hospital.ecdh.privateKey, this.patient.ecdh.publicKey),
      sk_disease = await this.Crypto.Hash.SHA512(masterKey + nonce, true),
      sk_diagnose = await this.Crypto.Hash.SHA512(sk_disease + this.data.date, true)

    this.data.nonce = nonce

    return {
      disease: sk_disease,
      diagnose: sk_diagnose
    }
  }

  async generateCipher(keys: any) {
    this.data.cipher = {
      disease: this.Crypto.AES.encrypt(<string>this.record.value.disease, keys.disease, this.patient.iv),
      diagnose: this.Crypto.AES.encrypt(<string>this.record.value.diagnose, keys.diagnose)
    }

    await this.generateMetadata()
  }

  async generateMetadata() {
    this.data.metadata = {
      disease: await this.Crypto.Hash.SHA512(this.data.cipher.disease, true),
      diagnose: await this.Crypto.Hash.SHA512(this.data.cipher.diagnose, true)
    }

    this.post_record()
  }

  onOpenDialogClick() {
    const observable = {
      next: async (confirmed: boolean) => {
        if (confirmed) await this.submit();
      }, error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }

    const subscription = this.dialog.confirmationPopUp({
      title: 'Add New Health Record',
      instruction: 'Do you want to add new health record? Please make sure you enter the data correctly',
      cancel: 'No',
      confirm: 'Yes',
    }).subscribe(observable);
  }

  async submit() {
    if (this.patient)
      this.get_timestamp()
  }

  get_timestamp() {
    const observable = {
      next: async (response: any) => {
        this.data.date = response
        const sk_diag = await this.generateSessionKeys()
        await this.generateCipher(sk_diag)
      },
      error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }

    const subscription = this.api.get('time').subscribe(observable)
  }

  onOpenAlert() {
    this.alert.confirmationAlert({
      image: "assets/images/check.svg",
      title: 'Congratulations!',
      information: 'Health Record has been successfully created ',
    })
      .subscribe(_ => {
        setTimeout(() => {
          this.alert.close()
        }, 2000)
      });
  }

  post_record() {
    const observable = {
      next: async (response: any) => {
        await this.route.navigate(['diseases'])
        await this.onOpenAlert()
      },
      error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }

    const subscription = this.api.post('records', this.data).subscribe(observable)
  }
}
