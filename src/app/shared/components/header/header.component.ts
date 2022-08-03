import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PopUpService} from "../../../services/pop-up/pop-up.service";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  doctor: any = null
  hospital: any = null
  lastName: string | undefined

  constructor(private router: Router, private dialog: PopUpService, private alert: AlertService) {
  }

  async ngOnInit(): Promise<void> {
    await this.checkSession()

    this.hospital = JSON.parse(<string>localStorage.getItem('hospital')).name

    // this.doctor = JSON.parse(<string>localStorage.getItem('doctor'))
    // this.lastName = this.doctor.name.split(' ').slice(-1)
  }

  async checkSession() {
    if (!localStorage.getItem('doctor')) {
      await this.router.navigate(['/login'])
    }
  }

  onOpenDialogClick(){
    this.dialog.confirmationPopUp({
      title: 'Hope to see you soon!',
      instruction: 'Are you sure want to log out from this account?',
      confirm: 'Log Out',
      cancel: 'No'
    })
      .subscribe((confirmed) => {
        if (confirmed) this.logout();
      });
  }

  onOpenAlert(){
    this.alert.confirmationAlert({
      image: "../../../assets/images/check.svg",
      title: 'Congratulations!',
      information: 'Your are successfully logged out'
    })
      .subscribe(_ => {
        setTimeout(() => {
          this.alert.close()
        }, 4000)
      });
  }


  async logout(){
    localStorage.removeItem('doctor')
    await this.router.navigate(['/welcome'])
    await this.onOpenAlert()
  }
}
