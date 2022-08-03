import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertData} from "../../../../interfaces/alert-data";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor( private router:Router,
               private alertRef: MatDialogRef<AlertComponent>,
               @Inject(MAT_DIALOG_DATA) public data: AlertData) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.alertRef.close();
  }

}
