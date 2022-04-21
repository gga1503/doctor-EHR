import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CameraScanQrPageComponent} from './pages/camera-scan-qr-page/camera-scan-qr-page';
import {HeaderLogoutComponent} from "./header-logout/header-logout.component";
import {CardPatientDataComponent} from "./card-patient-data/card-patient-data.component";
import {TableListEhrComponent} from "./table-list-ehr/table-list-ehr.component";
import {TableDropdownComponent} from "./table-dropdown/table-dropdown.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {DashboardScanQrPageComponent} from "./pages/dashboard-scan-qr-page/dashboard-scan-qr-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'dashboard', component: DashboardScanQrPageComponent},
  {path: 'scan-qr', component: CameraScanQrPageComponent},
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
