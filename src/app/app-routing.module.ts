import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CameraScanQrPageComponent} from './pages/qr-scanner/qr-scanner.component';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'scan-qr', component: CameraScanQrPageComponent},
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then(m => m.RecordsModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
