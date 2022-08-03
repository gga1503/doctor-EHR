import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {DiseasesComponent} from "./pages/diseases/diseases.component";
import {ListDoctorComponent} from "./pages/admin/list-doctor/list-doctor.component";
import {CreateDoctorAccountComponent} from "./pages/admin/create-doctor-account/create-doctor-account.component";

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'diseases', component: DiseasesComponent},
  {path: 'doctors', component: ListDoctorComponent},
  {path: 'account', component: CreateDoctorAccountComponent},
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then(m => m.RecordsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
