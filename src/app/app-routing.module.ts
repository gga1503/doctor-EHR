import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {DiseasesComponent} from "./pages/diseases/diseases.component";
import {CreateDoctorComponent} from "./pages/doctors/create-doctor/create-doctor.component";
import { TestingComponent } from './pages/testing/testing.component';

const routes: Routes = [
  {path: '', redirectTo: '/testing', pathMatch: 'full'},
  {path: 'testing', component: TestingComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'diseases', component: DiseasesComponent},
  {path: 'account', component: CreateDoctorComponent},
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then(m => m.RecordsModule)
  },
  {
    path: 'doctors',
    loadChildren: () => import('./pages/doctors/doctors.module').then(m => m.DoctorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
