import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecordsRoutingModule} from './records-routing.module';
import {RecordsComponent} from './records.component';
import {CreateRecordComponent} from './create-record/create-record.component';
import {RecordDetailComponent} from './record-detail/record-detail.component';

import {RouterModule} from "@angular/router";
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RecordsComponent,
    CreateRecordComponent,
    RecordDetailComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RecordsComponent,
    CreateRecordComponent,
    RecordDetailComponent
  ]
})

export class RecordsModule {
}
