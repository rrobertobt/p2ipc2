import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {UsersComponent} from "./pages/users/users.component";
import {MainPatientComponent} from "./pages/main-patients/main-patient.component";
import {MainMedicsComponent} from "./pages/main-medics/main-medics.component";
import {MainLaboratoriesComponent} from "./pages/main-laboratories/main-laboratories.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";

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
      }
    ],
    title: 'Laboratorio - Principal' + titleSufix
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Página no encontrada' + titleSufix
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
