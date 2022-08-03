import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PopUpService} from "../../../shared/services/pop-up/pop-up.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: PopUpService
  ) { }

  ngOnInit(): void {
  }

  public onOpenDialogClick(){
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

  async logout(){
    // localStorage.removeItem('doctor')
    await this.router.navigate(['/login'])
  }

}
