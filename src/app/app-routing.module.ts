import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QrScanner} from './pages/qr-scanner/qr-scanner.component';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: '/records/create', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'scan-qr', component: QrScanner},
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then(m => m.RecordsModule)}
  // }, {
  //   path: 'simulations',
  //   loadChildren: () => import('./simulation/simulation.module').then(m => m.SimulationModule)
  // }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
