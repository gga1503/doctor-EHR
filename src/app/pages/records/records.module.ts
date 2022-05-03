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


@NgModule({
  declarations: [
    RecordsComponent,
    RecordsCreateComponent,
    RecordsShowComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    RouterModule,
    SharedModule,
    SimulationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RecordsComponent,
    RecordsCreateComponent,
    RecordsShowComponent
  ]
})
export class RecordsModule { }
