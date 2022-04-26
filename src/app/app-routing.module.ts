import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CameraScanQrPageComponent} from './pages/camera-scan-qr-page/camera-scan-qr-page';
import {HeaderLogoutComponent} from "./components/header-logout/header-logout.component";
import {CardPatientDataComponent} from "./components/card-patient-data/card-patient-data.component";
import {SearchListEhrComponent} from "./components/search-list-ehr/search-list-ehr.component";
import {TableDropdownComponent} from "./components/table-dropdown/table-dropdown.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {DashboardScanQrPageComponent} from "./pages/dashboard-scan-qr-page/dashboard-scan-qr-page.component";
import {ListEhrPageComponent} from "./pages/list-ehr-page/list-ehr-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'dashboard', component: DashboardScanQrPageComponent},
  {path: 'scan-qr', component: CameraScanQrPageComponent},
  {path: 'list-ehr', component: ListEhrPageComponent},
  {
    path: 'records',
    loadChildren: () => import('./records/records.module').then(m => m.RecordsModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
