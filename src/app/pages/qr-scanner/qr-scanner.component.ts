import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScanner implements OnInit {

  qr_data:any;

  constructor(private location: Location) { }

  ngOnInit(): void {

  }

  clearResult(): void {
    this.qr_data = null;
  }

  onCodeResult(resultString: string) {
    this.qr_data = resultString;
  }



  title = 'patient-EHR';

}
