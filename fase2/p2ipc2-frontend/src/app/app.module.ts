import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import {MatDividerModule} from "@angular/material/divider";
import { RegisterComponent } from './pages/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import { UsersComponent } from './pages/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MainPatientComponent } from './pages/main-patients/main-patient.component';
import { MainMedicsComponent } from './pages/main-medics/main-medics.component';
import { MainLaboratoriesComponent } from './pages/main-laboratories/main-laboratories.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { PatientNavbarComponent } from './components/navigation/patient-navbar/patient-navbar.component';
import { MedicNavbarComponent } from './components/navigation/medic-navbar/medic-navbar.component';
import { LaboratoryNavbarComponent } from './components/navigation/laboratory-navbar/laboratory-navbar.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditProfileFormComponent } from './components/edit-profile-form/edit-profile-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    RegisterComponent,
    RegisterFormComponent,
    UsersComponent,
    MainPatientComponent,
    MainMedicsComponent,
    MainLaboratoriesComponent,
    PatientNavbarComponent,
    MedicNavbarComponent,
    LaboratoryNavbarComponent,
    EditProfileComponent,
    EditProfileFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
