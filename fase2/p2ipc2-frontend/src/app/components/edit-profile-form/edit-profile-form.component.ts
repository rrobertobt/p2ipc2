import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UpdateUserService} from "../../services/update-user/update-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout/logout.service";
import {CurrentUserService} from "../../services/current-user/current-user.service";


@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {

  @Input() user!: UserModel;

  constructor(
    private updateUserService: UpdateUserService,
    private logoutService: LogoutService,
    private currentUserService: CurrentUserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  newUser = {
    id: 0,
    name : '',
    username : '',
    password : '',
    address : '',
    phone : '',
    email : '',
    cui: '',
    birthdate: new Date(),
  }
  onSubmit() {
    const date = this.newUser.birthdate.toISOString().slice(0, 10);
    const {birthdate, ...userData} = this.newUser;
    const newUser = {...userData, birthdate: date};

    this.updateUserService.updateUser(newUser).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open('Usuario actualizado exitosamente, por favor vuelve recarga la página para aplicar los cambios', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.currentUserService.updateCurrentUser();
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Hubo un error al actualizar el usuario, es posible que el nombre de usuario ya este en uso', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    }
    );

    console.log(newUser);
  }
  ngOnInit(): void {
    this.newUser = {
      id: this.user.id,
      name : this.user.name,
      username : this.user.username,
      password : '',
      address : this.user.address,
      phone : this.user.phone,
      email : this.user.email,
      cui: this.user.cui,
      birthdate: new Date(this.user.birthdate),
    }
  }

}
