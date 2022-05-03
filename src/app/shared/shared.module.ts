import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {PatientCardComponent} from './components/patient-card/patient-card.component';
import {RecordSearchComponent} from './components/record-search/record-search.component';
import {DiseasesTableComponent} from './components/diseases-table/diseases-table.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    HeaderComponent,
    PatientCardComponent,
    RecordSearchComponent,
    DiseasesTableComponent
  ], imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,

  ], exports: [
    CommonModule,
    HeaderComponent,
    PatientCardComponent,
    RecordSearchComponent,
    DiseasesTableComponent
  ]
})
export class SharedModule {
}
