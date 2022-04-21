import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-scan-qr-page',
  templateUrl: './camera-scan-qr-page.component.html',
  styleUrls: ['./camera-scan-qr-page.scss']
})
export class CameraScanQrPageComponent implements OnInit {

  qrResultString:any;

  constructor() { }

  ngOnInit(): void {
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  title = 'patient-EHR';

}
