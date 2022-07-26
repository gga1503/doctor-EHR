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

  hospital_bc_address = '0x7E707caAdab81FddD15b549b7e2cd199B5ebe7b5'

  login = this.formBuilder.group({
    email: 'doctor@hospital.com',
    password: 'doctor123'
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
      async (doctor) => {
        localStorage.setItem('doctor', JSON.stringify(doctor));

        this.api.get(`hospitals/login/${this.hospital_bc_address}`).subscribe(
          hospital => {
            localStorage.setItem('hospital', JSON.stringify(hospital));

            this.router.navigate(['/dashboard']);
          }, error => console.error(error)
        );
      },
      error => {console.error(error)}
    )
  }
}
