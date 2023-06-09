import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {UsersComponent} from "./pages/users/users.component";
import {MainPatientComponent} from "./pages/main-patients/main-patient.component";
import {MainMedicsComponent} from "./pages/main-medics/main-medics.component";
import {MainLaboratoriesComponent} from "./pages/main-laboratories/main-laboratories.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {InitialSetupMedicsComponent} from "./pages/main-medics/initial-setup-medics/initial-setup-medics.component";
import {
  InitialSetupLaboratoriesComponent
} from "./pages/main-laboratories/initial-setup-laboratories/initial-setup-laboratories.component";
import {DummyComponent} from "./components/dummy/dummy.component";
import {MainAdminsComponent} from "./pages/main-admins/main-admins.component";
import {HomePatientsComponent} from "./pages/main-patients/home-patients/home-patients.component";
import {BalanceRechargeComponent} from "./pages/main-patients/balance-recharge/balance-recharge.component";
import {ScheduleAppointmentComponent} from "./pages/main-patients/schedule-appointment/schedule-appointment.component";
import {HomeMedicsComponent} from "./pages/main-medics/home-medics/home-medics.component";
import {HomeLaboratoriesComponent} from "./pages/main-laboratories/home-laboratories/home-laboratories.component";
import {AppointmentDetailsComponent} from "./pages/main-medics/appointment-details/appointment-details.component";
import {HomeAdminComponent} from "./pages/main-admins/home-admin/home-admin.component";

const titleSufix = ' - P2IPC2';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Pagina de inicio' + titleSufix
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Inicio de sesión' + titleSufix
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro de usuario' + titleSufix
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Usuarios' + titleSufix
  },
  {
    path: 'main-patients',
    component: MainPatientComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        title: 'Paciente - Editar perfil' + titleSufix
      },
      {
        path: 'home',
        component: HomePatientsComponent,
        title: 'Paciente - Inicio' + titleSufix
      },
      {
        path: 'balance-recharge',
        component: BalanceRechargeComponent,
        title: 'Paciente - Recarga de saldo' + titleSufix
      },
      {
        path: 'schedule-appointment',
        component: ScheduleAppointmentComponent,
        title: 'Paciente - Agendar cita' + titleSufix
      }
    ],
    title: 'Paciente - Principal' + titleSufix
  },
  {
    path: 'main-medics',
    component: MainMedicsComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        title: 'Médico - Editar perfil' + titleSufix
      },
      {
        path: 'initial-setup',
        component: InitialSetupMedicsComponent,
        title: 'Médico - Configuración inicial' + titleSufix
      },
      {
        path: 'home',
        component: HomeMedicsComponent,
        title: 'Médico - Inicio' + titleSufix
      },
      {
        path: 'appointments/:id',
        component: AppointmentDetailsComponent,
        title: 'Médico - Detalles de cita' + titleSufix
      }
    ],
    title: 'Médico - Principal' + titleSufix
  },
  {
    path: 'main-laboratories',
    component: MainLaboratoriesComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        title: 'Laboratorio - Editar perfil' + titleSufix
      },
      {
        path: 'initial-setup',
        component: InitialSetupLaboratoriesComponent,
        title: 'Laboratorio - Configuración inicial' + titleSufix
      },
      {
        path: 'home',
        component: HomeLaboratoriesComponent,
        title: 'Laboratorio - Inicio' + titleSufix
      }
    ],
    title: 'Laboratorio - Principal' + titleSufix
  },
  {
    path: 'main-admin',
    component: MainAdminsComponent,
    title: 'Administrador - Principal' + titleSufix,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        title: 'Administrador - Editar perfil' + titleSufix
      },
      {
        path: 'home',
        component: HomeAdminComponent,
        title: 'Administrador - Inicio' + titleSufix
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Página no encontrada' + titleSufix
  },
  {
    path: 'dummy',
    component: DummyComponent,
    title: 'Dummy' + titleSufix
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
