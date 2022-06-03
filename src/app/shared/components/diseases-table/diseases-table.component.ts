import {Component, Input, OnInit} from '@angular/core';

import {PopUpScanQrComponent} from "../pop-up-scan-qr/pop-up-scan-qr.component";
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api/api.service";
import {QrScanner} from "../qr-scanner/qr-scanner.component";

@Component({
  selector: 'app-diseases-table',
  templateUrl: './diseases-table.component.html',
  styleUrls: ['./diseases-table.component.scss']
})

export class DiseasesTableComponent implements OnInit{
  @Input() diseases: any;
  scannerOn = false;

  constructor(private popUp: MatDialog,
      private router: Router,
      private api: ApiService){
  }

  ngOnInit(): void {
  }

  openQrScanner() {
    this.popUp.open(QrScanner)
  }

  getPatientAddress(scanResult: string) {
    this.toggleQrScanner()

    this.get_patient(scanResult)
  }

  toggleQrScanner() {
    this.scannerOn = !this.scannerOn;
  }

  get_patient(address: String): void {
    this.api.get('patients/' + address).subscribe(
      async patient => {
        sessionStorage.setItem('patient', JSON.stringify(patient))

        await this.router.navigate(['diseases'])
      }
    )
  }
}
