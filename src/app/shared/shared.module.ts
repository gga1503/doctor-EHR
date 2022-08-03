import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {PatientCardComponent} from './components/patient-card/patient-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from "@angular/router";
import {QrScanner} from "./components/qr-scanner/qr-scanner.component";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {CiphersTableComponent} from "./components/tables/ciphers/ciphers.table.component";
import {DiseasesTableComponent} from "./components/tables/diseases/diseases.table.component";
import { ConfirmationComponent } from './components/pop-up/confirmation/confirmation.component';
import { AlertComponent } from './components/pop-up/alert/alert.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    PatientCardComponent,
    CiphersTableComponent,
    DiseasesTableComponent,
    QrScanner,
    ConfirmationComponent,
    AlertComponent
  ], imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    RouterModule,
    MatDialogModule,
    ZXingScannerModule,
    Ng2SearchPipeModule,
    FormsModule
  ], exports: [
    CommonModule,
    HeaderComponent,
    PatientCardComponent,
    CiphersTableComponent,
    DiseasesTableComponent,
    QrScanner
  ]
})

export class SharedModule {
}
