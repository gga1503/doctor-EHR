import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {PatientCardComponent} from './components/patient-card/patient-card.component';
import {RecordSearchComponent} from './components/record-search/record-search.component';
import {CiphersTableComponent} from './components/tables/ciphers/ciphers.table.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from "@angular/router";
import {DiseasesTableComponent} from './components/tables/diseases/diseases.table.component';
import {QrScanner} from "./components/qr-scanner/qr-scanner.component";
import {ZXingScannerModule} from "@zxing/ngx-scanner";

@NgModule({
  declarations: [
    HeaderComponent,
    PatientCardComponent,
    RecordSearchComponent,
    CiphersTableComponent,
    DiseasesTableComponent,
    QrScanner
  ], imports: [
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
    CiphersTableComponent,
    DiseasesTableComponent,
    QrScanner
  ]
})
export class SharedModule {
}
