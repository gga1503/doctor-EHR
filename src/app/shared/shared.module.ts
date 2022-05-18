import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {PatientCardComponent} from './components/patient-card/patient-card.component';
import {RecordSearchComponent} from './components/record-search/record-search.component';
import {DiseasesTableComponent} from './components/diseases-table/diseases-table.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from "@angular/router";
import {UnlockDiseasesTableComponent} from './components/unlock-diseases-table/unlock-diseases-table.component';
import {PopUpScanQrComponent} from './components/pop-up-scan-qr/pop-up-scan-qr.component';
import {QrScanner} from "./components/qr-scanner/qr-scanner.component";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    HeaderComponent,
    PatientCardComponent,
    RecordSearchComponent,
    DiseasesTableComponent,
    UnlockDiseasesTableComponent,
    PopUpScanQrComponent,
    QrScanner
  ], imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    RouterModule,
    MatDialogModule,
    ZXingScannerModule,
  ], exports: [
    CommonModule,
    HeaderComponent,
    PatientCardComponent,
    RecordSearchComponent,
    DiseasesTableComponent,
    UnlockDiseasesTableComponent,
    PopUpScanQrComponent,
    QrScanner
  ]
})
export class SharedModule {
}
