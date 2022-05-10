import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records/records.component';
import { RecordsCreateComponent } from './records-create/records-create.component';
import { RecordsShowComponent } from './records-show/records-show.component';

import {RouterModule} from "@angular/router";
import {SharedModule} from '../../shared/shared.module';
import {SimulationModule} from "../../simulation/simulation.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { RecordsDiseaseComponent } from './records-disease/records-disease.component';



@NgModule({
  declarations: [
    RecordsComponent,
    RecordsCreateComponent,
    RecordsShowComponent,
    RecordsDiseaseComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    RouterModule,
    SharedModule,
    SimulationModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    RecordsComponent,
    RecordsCreateComponent,
    RecordsShowComponent,
    RecordsDiseaseComponent
  ]
})
export class RecordsModule { }
