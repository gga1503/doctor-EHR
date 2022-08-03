import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {PopUpData} from "../../../interfaces/pop-up-data";
import {ConfirmationComponent} from "../../components/pop-up/confirmation/confirmation.component";


@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private dialog: MatDialog) {
  }

  public confirmationPopUp(data: PopUpData):Observable<boolean>{
    return this.dialog
      .open(ConfirmationComponent, {
        data,
        panelClass: 'custom-popup-background',
        disableClose: true,
      })
      .afterClosed();
  }
}
