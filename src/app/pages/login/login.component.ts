import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hospital_bc_address = environment.hospital_bc_address

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.email]),
    password: new FormControl('', Validators.compose([
      Validators.minLength(5),
      Validators.required
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
        if(response) {
          localStorage.setItem('doctor', JSON.stringify(response));
          this.getHospital()
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
        await this.router.navigate(['/dashboard']);
      }, error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }

    const subscription = this.api.get(`hospitals/login/${environment.hospital_bc_address}`).subscribe(observable)
  }
}
