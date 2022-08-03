import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DoctorsComponent} from "./doctors/doctors.component";
import {CreateDoctorComponent} from "./create-doctor/create-doctor.component";

const routes: Routes = [
  { path: "", component: DoctorsComponent},
  { path: "create", component: CreateDoctorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
