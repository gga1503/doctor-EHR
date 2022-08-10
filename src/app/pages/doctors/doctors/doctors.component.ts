import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PopUpService} from "../../../shared/services/pop-up/pop-up.service";
import {ApiService} from "../../../shared/services/api/api.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  hospital = JSON.parse(<string>sessionStorage.getItem('hospital'))
  doctors: any

  hide = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private dialog: PopUpService
  ) { }

  ngOnInit(): void {
    this.getDoctors()
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

  async getDoctors() {
    this.api.get('doctors/Siloam Hospital').subscribe(
      async doctors => {
        this.doctors = doctors;
      }
    )
  }

  deleteClick(){
    this.dialog.confirmationPopUp({
      title: 'Delete Account',
      instruction: 'Do you want to delete this account?',
      cancel: 'No',
      confirm: 'Yes',
    })
      .subscribe((confirmed) => {
        if (confirmed) this.delete();
      });
  }

  async delete(){
  }

  async logout(){
    // localStorage.removeItem('doctor')
    await this.router.navigate(['/login'])
  }



}
