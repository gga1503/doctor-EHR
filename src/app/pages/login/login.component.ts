import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api/api.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  doctor = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ]))
  })

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
  }

  submit() {
    const observable = {
      next: (response: any) => {
        if(response.model == 'Doctor') {
          localStorage.setItem('doctor', JSON.stringify(response));
          this.getHospital();
          this.router.navigate(['/dashboard']);
        }
        else if (response.model == 'Hospital'){
          localStorage.setItem('hospital', JSON.stringify(response));
          this.getHospital()
          this.router.navigate(['/doctors'])
        }
      }, error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }



    const subscription = this.api.get(
      `doctors/login?email=${this.doctor.value.email}&password=${this.doctor.value.password}`)
      .subscribe(observable)
  }

  getHospital() {
    const observable = {
      next: async (response: any) => {
        localStorage.setItem('hospital', JSON.stringify(response));
      }, error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }

    const subscription = this.api.get(`hospitals/login/${environment.hospital_bc_address}`).subscribe(observable)
  }
}
