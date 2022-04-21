import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records/records.component';
import { RecordsCreateComponent } from './records-create/records-create.component';
import { RecordsShowComponent } from './records-show/records-show.component';

// import {HeaderLogoutComponent} from "../header-logout/header-logout.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    RecordsComponent,
    RecordsCreateComponent,
    RecordsShowComponent
    // HeaderLogoutComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    RouterModule
  ]
})
export class RecordsModule { }
