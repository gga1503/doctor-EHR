import {Component, Input, OnInit} from '@angular/core';
import {CryptoService} from '../../../shared/services/crypto/crypto.service';
import {ApiService} from "../../../shared/services/api/api.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {PopUpService} from "../../../services/pop-up/pop-up.service";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {
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

  previousPage() {
    this.location.back();
  }

  async generateSecretKey() {
    this.hospital.ecdh = {
      privateKey: await this.Crypto.ECDH.importPrivateKey(this.hospital.ecdh_private_key)
    }

    this.patient.ecdh = {
      publicKey: await this.Crypto.ECDH.importPublicKey(this.patient.ecdh_public_key)
    }

    return await this.Crypto.ECDH.computeSecret(this.hospital.ecdh.privateKey, this.patient.ecdh.publicKey)
  }

  async generateCipher(secret_key: string) {
    this.data.cipher = {
      disease: this.Crypto.AES.encrypt(<string>this.record.value.disease, secret_key, this.patient.iv),
      diagnose: this.Crypto.AES.encrypt(<string>this.record.value.diagnose, secret_key)
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

  onOpenDialogClick(){
    this.dialog.confirmationPopUp({
      title: 'Add New Health Record',
      instruction: 'Do you want to add new health record? Please make sure you enter the data correctly',
      cancel: 'No',
      confirm: 'Yes',
    })
      .subscribe((confirmed) => {
        if (confirmed) this.submit();
      });
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
        const secret_key = await this.generateSecretKey()
        await this.generateCipher(secret_key)
      }
    }

    subscription = this.api.get('time').subscribe(observable)
  }

  onOpenAlert(){
    this.alert.confirmationAlert({
      image: "../../../assets/images/check.svg",
      title: 'Congratulations!',
      information: 'Health Record has been successfully created ',
    })
      .subscribe(_ => {
        setTimeout(() => {
          this.alert.close()
        }, 4000)
      });
  }

  post_record() {
    const observable = {
      next: (response: any) => console.log(response),
      error: (err: Error) => console.error(err),
      complete: async () => {
        subscription.unsubscribe()
        await this.route.navigate(['diseases'])
        await this.onOpenAlert()
      }
    }

    const subscription = this.api.post('records', this.data).subscribe(observable)
  }

}
