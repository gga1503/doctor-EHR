import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api/api.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService) {
  }

  doctor: any = null

  async ngOnInit(): Promise<void> {
    const url = 'doctors?email=angeline@gmail.com&password=doctor123'
    const result = await this.api.get(url)

    console.log(result)
  }


}
