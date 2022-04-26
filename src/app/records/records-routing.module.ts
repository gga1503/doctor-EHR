import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';
import {RecordsCreateComponent} from './records-create/records-create.component';
import {RecordsShowComponent} from './records-show/records-show.component';
import {AppRoutingModule} from "../app-routing.module";
import {HeaderLogoutComponent} from "../components/header-logout/header-logout.component";

const routes: Routes = [
  { path: '', component: RecordsComponent},
  { path: 'write', component: RecordsCreateComponent},
  { path: ':record', component: RecordsShowComponent},
  { path: 'show', component: RecordsShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
