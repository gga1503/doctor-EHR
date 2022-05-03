import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {NgQrScannerModule} from 'angular2-qrscanner';
import {QrScanner} from './pages/qr-scanner/qr-scanner.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./shared/services/api/api.service";


@NgModule({
  declarations: [
    AppComponent,
    QrScanner,
    WelcomeComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    NgQrScannerModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService],
  exports: [
    CommonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
