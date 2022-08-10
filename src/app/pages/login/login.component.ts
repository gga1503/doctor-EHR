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
  hospital_bc_address = environment.hospital_bc_address

  email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.email]);
  password = new FormControl('', Validators.compose([
    Validators.minLength(5),
    Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
  ]));

  login = this.formBuilder.group({
    email: 'graceangeline@gmail.com',
    password: 'doctor123'
  })

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  getErrorMessage() {
    if (this.email.hasError('required') && this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  doctor: any = null

  async ngOnInit(): Promise<void> {
  }

  async submit() {
     const target = `doctors/login?email=${this.login.value.email}&password=${this.login.value.password}`
    // // const target2 = `hospitals/login?email=${this.login.value.email}&password=${this.login.value.password}`

    // this.api.get(target).subscribe(
    //   async (doctor) => {
    //     localStorage.setItem('doctor', JSON.stringify(doctor));

    //     this.api.get(`hospitals/login/${this.hospital_bc_address}`).subscribe(
    //       hospital => {
    //         localStorage.setItem('hospital', JSON.stringify(hospital));

    //         this.router.navigate(['/dashboard']);
    //       }, error => console.error(error)
    //     );
    //   },
    //   error => {console.error(error)}
    // )

    const observable = {
      next: (response: any) => {
        localStorage.setItem('doctor', JSON.stringify(response))
      }, 
      error: (err: Error) => console.error(err),
      complete: async () => {
        subscription.unsubscribe()
        await this.router.navigate(['/dashboard'])
      }
    }
    
    const subscription = this.api.get(target).subscribe(observable);
  }
}
