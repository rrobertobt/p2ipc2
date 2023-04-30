import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  email!: string;
  password!: string;

  onSubmit() {
    console.log('Login Form Submitted!');
    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.snackBar.open('Inicio de sesión exitoso', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        switch (response.type) {
          case 'patient':
            this.router.navigate(['/main-patients']).then();
            break;
          case 'medic':
            this.router.navigate(['/main-medics']).then();
            break;
          case 'laboratory':
            this.router.navigate(['/main-laboratories']).then();
            break;
          case 'admin':
            this.router.navigate(['/main-admins']).then();
            break;
          default:
            this.router.navigate(['/login']).then();
        }
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Hubo un error al iniciar sesión, verifica tus credenciales', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        }
      });
    }
  }
