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
import { InitialSetupMedicsComponent } from './pages/main-medics/initial-setup-medics/initial-setup-medics.component';
import { InitialSetupLaboratoriesComponent } from './pages/main-laboratories/initial-setup-laboratories/initial-setup-laboratories.component';
import { InitialSetupMedicsFormComponent } from './components/initial-setup-medics-form/initial-setup-medics-form.component';
import { InitialSetupLaboratoriesFormComponent } from './components/initial-setup-laboratories-form/initial-setup-laboratories-form.component';
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { DummyComponent } from './components/dummy/dummy.component';
import { BasicInfoDialogComponent } from './components/utils/basic-info-dialog/basic-info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { HomePatientsComponent } from './pages/main-patients/home-patients/home-patients.component';
import { HomeMedicsComponent } from './pages/main-medics/home-medics/home-medics.component';
import { HomeLaboratoriesComponent } from './pages/main-laboratories/home-laboratories/home-laboratories.component';
import { MainAdminsComponent } from './pages/main-admins/main-admins.component';
import { AdminNavbarComponent } from './components/navigation/admin-navbar/admin-navbar.component';
import { BalanceRechargeFormComponent } from './components/balance-recharge-form/balance-recharge-form.component';
import { BalanceRechargeComponent } from './pages/main-patients/balance-recharge/balance-recharge.component';
import { BalanceHistoryComponent } from './components/balance-history/balance-history.component';
import { ScheduleAppointmentComponent } from './pages/main-patients/schedule-appointment/schedule-appointment.component';
import { CancelOkDialogComponent } from './components/utils/cancel-ok-dialog/cancel-ok-dialog.component';
import { AppointmentDetailsComponent } from './pages/main-medics/appointment-details/appointment-details.component';
import { AppointmentDetailsCardComponent } from './components/appointment-details-card/appointment-details-card.component';
import { AppointmentInfoComponent } from './components/appointment-details-card/appointment-info/appointment-info.component';
import { HomeAdminComponent } from './pages/main-admins/home-admin/home-admin.component';


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
    EditProfileFormComponent,
    InitialSetupMedicsComponent,
    InitialSetupLaboratoriesComponent,
    InitialSetupMedicsFormComponent,
    InitialSetupLaboratoriesFormComponent,
    DummyComponent,
    BasicInfoDialogComponent,
    HomePatientsComponent,
    HomeMedicsComponent,
    HomeLaboratoriesComponent,
    MainAdminsComponent,
    AdminNavbarComponent,
    BalanceRechargeFormComponent,
    BalanceRechargeComponent,
    BalanceHistoryComponent,
    ScheduleAppointmentComponent,
    CancelOkDialogComponent,
    AppointmentDetailsComponent,
    AppointmentDetailsCardComponent,
    AppointmentInfoComponent,
    HomeAdminComponent
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
        MatTooltipModule,
        MatListModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
