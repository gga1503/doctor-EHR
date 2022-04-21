import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { CameraScanQrPageComponent } from './pages/camera-scan-qr-page/camera-scan-qr-page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardPatientDataComponent } from './card-patient-data/card-patient-data.component';
import { TableDropdownComponent } from './table-dropdown/table-dropdown.component';
import { HeaderLogoutComponent } from './header-logout/header-logout.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { TableListEhrComponent } from './table-list-ehr/table-list-ehr.component';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardScanQrPageComponent } from './pages/dashboard-scan-qr-page/dashboard-scan-qr-page.component';
import { ListEhrPageComponent } from './pages/list-ehr-page/list-ehr-page.component';


@NgModule({
    declarations: [
        AppComponent,
        CameraScanQrPageComponent,
        CardPatientDataComponent,
        TableDropdownComponent,
        HeaderLogoutComponent,
        TableListEhrComponent,
        WelcomePageComponent,
        LoginPageComponent,
        DashboardScanQrPageComponent,
        ListEhrPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ZXingScannerModule,
        NgQrScannerModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        MatTableModule,
        FontAwesomeModule,
    ],
    providers: [],
    exports: [
        HeaderLogoutComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
