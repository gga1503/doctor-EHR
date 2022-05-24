import {Component, Input, OnInit} from '@angular/core';

import {PopUpScanQrComponent} from "../pop-up-scan-qr/pop-up-scan-qr.component";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-diseases-table',
  templateUrl: './diseases-table.component.html',
  styleUrls: ['./diseases-table.component.scss']
})

export class DiseasesTableComponent implements OnInit{
  @Input() diseases: any;

  constructor(private popUp: MatDialog) {
  }

  ngOnInit(): void {
  }

  openQrScanner() {
    this.popUp.open(PopUpScanQrComponent)
  }
}
