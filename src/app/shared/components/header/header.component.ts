import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  doctor: any = null
  lastName: string | undefined

  constructor(private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.checkSession()

    this.doctor = JSON.parse(<string>localStorage.getItem('doctor'))
    this.lastName = this.doctor.name.split(' ').slice(-1)
  }

  async checkSession() {
    if (!localStorage.getItem('doctor')) {
      await this.router.navigate(['/login'])
    }
  }

  async logout(){
    localStorage.removeItem('doctor')
    await this.router.navigate(['/login'])
  }
}
