import { Component } from '@angular/core';
import {RegisterService} from "../../services/register/register.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  newUser = {
    name : '',
    username : '',
    password : '',
    address : '',
    phone : '',
    email : '',
    cui: '',
    birthdate: new Date(),
    type: 'patient'
  };

  onSubmit(){
    console.log('onSubmit');
    const date = this.newUser.birthdate.toISOString().slice(0, 10);
    const {birthdate, ...userData} = this.newUser;
    const newUser = {...userData, birthdate: date};

    this.registerService.register(newUser).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open('Usuario creado exitosamente, ahora puedes iniciar sesión', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/login']).then();
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Hubo un error al crear el usuario, es posible que el nombre de usuario ya este en uso', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
