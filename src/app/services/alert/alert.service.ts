import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertData} from "../../interfaces/alert-data";
import {AlertComponent} from "../../shared/components/pop-up/alert/alert.component";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog) {
  }

  public confirmationAlert(data: AlertData){
    return this.dialog
      .open(AlertComponent, {
        data,
        panelClass: ['custom-alert-background','animate__animated','animate__zoomIn'],
        disableClose: true
      })
    .afterOpened()
  }

  public close(){
    return this.dialog.closeAll()
  }
}
