import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../shared/services/api/api.service";
import {AlertService} from "../../../shared/services/alert/alert.service";
import {PopUpService} from "../../../shared/services/pop-up/pop-up.service";

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.scss']
})
export class CreateDoctorComponent implements OnInit {
  hospital = JSON.parse(<string>localStorage.getItem('hospital'))
  hide = true;
  // account = this.formBuilder.group({
  //   name: '',
  //   speciality: '',
  //   email: '',
  //   password: ''
  // })

  account = new FormGroup({
    name: new FormControl('', [Validators.required]),
    speciality: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern("[a-z0-9._%+-].{4,}")])
  });

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private route: Router,
    private location: Location,
    private alert: AlertService,
    private dialog: PopUpService) {
  }

  ngOnInit(): void {
  }

  onOpenDialogClick(){
    this.dialog.confirmationPopUp({
      title: 'Create Doctor Account',
      instruction: 'Do you want to add new doctor account? Please make sure you enter the data correctly',
      cancel: 'No',
      confirm: 'Yes',
    })
      .subscribe((confirmed) => {
        if (confirmed) this.post_account();
      });
  }

  onOpenAlert(){
    this.alert.confirmationAlert({
      image: "assets/images/check.svg",
      title: 'Congratulations!',
      information: 'Doctor new account has been successfully created',
    })
      .subscribe(_ => {
        setTimeout(() => {
          this.alert.close()
        }, 4000)
      });
  }

  data: any = {
    name: this.account.value.name,
    bc_address: '0x28A5440536ab0e3F7C251b64da216F69fA568ce0',
    email: this.account.value.email,
    password: this.account.value.password,
    hospital: this.hospital.name,
    dob: this.account.value.dob,
    speciality: this.account.value.speciality
  }

  post_account() {
    const observable = {
      next: (response: any) => console.log(response),
      error: (err: Error) => console.error(err),
      complete: async () => {
        subscription.unsubscribe()
        await this.route.navigate(['doctors'])
        await this.onOpenAlert()
      }
    }

    this.fillFormData()
    const subscription = this.api.post('doctors', this.data).subscribe(observable)
  }

  async fillFormData() {
    this.data.name = this.account.value.name
    this.data.email = this.account.value.email
    this.data.dob = this.account.value.dob
    this.data.password = this.account.value.password
    this.data.speciality = this.account.value.speciality
  }

  previousPage() {
    this.location.back();
  }

}
