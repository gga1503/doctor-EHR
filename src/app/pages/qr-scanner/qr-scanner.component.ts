import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScanner implements OnInit {

  qr_data:any;

  constructor() { }

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
