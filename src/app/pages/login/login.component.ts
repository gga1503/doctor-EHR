import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api/api.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hospital_bc_address = '0x88b05b8A1BEf674b0bE36C23A6Ee6C9bA131BEe8'

  login = this.formBuilder.group({
    "password": "doctor123",
    "email": "doctor@hospital.com"
  })

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  doctor: any = null

  async ngOnInit(): Promise<void> {
  }

  async submit() {
    const target = `doctors/login?email=${this.login.value.email}&password=${this.login.value.password}`

    this.api.get(target).subscribe(
      async (response) => {
        localStorage.setItem('doctor', JSON.stringify(response));

        this.api.get(`hospitals/login/${this.hospital_bc_address}`).subscribe(
          response => {
            localStorage.setItem('hospital', JSON.stringify(response));
          }, err => console.error(err),
          () => {
            const hospital = JSON.parse(<string>localStorage.getItem('hospital'))
            console.log(`${hospital.name} information has been set successfully!`)
            this.router.navigate(['dashboard']);
          }
        )
      }, err => console.error(err),
      () => {
        const doctor = JSON.parse(<string>localStorage.getItem('doctor'))
        console.log(`dr. ${doctor.name} has logged in successfully!`)
      }
    )
  }
}
