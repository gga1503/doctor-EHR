import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./shared/services/api/api.service";
import {DiseasesComponent} from './pages/diseases/diseases.component';
import {MatInputModule} from "@angular/material/input";
import { DoctorsComponent } from './pages/doctors/doctors/doctors.component';
import { CreateDoctorComponent } from './pages/doctors/create-doctor/create-doctor.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    DashboardComponent,
    DiseasesComponent,
    DoctorsComponent,
    CreateDoctorComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule
    ],
  providers: [ApiService],
  exports: [
    CommonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
