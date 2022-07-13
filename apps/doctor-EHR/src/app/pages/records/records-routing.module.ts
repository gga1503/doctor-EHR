import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';
import {RecordsCreateComponent} from './records-create/records-create.component';
import {RecordsShowComponent} from './records-show/records-show.component';

const routes: Routes = [
  { path: '', component: RecordsComponent},
  { path: 'create', component: RecordsCreateComponent},
  { path: 'show', component: RecordsShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
