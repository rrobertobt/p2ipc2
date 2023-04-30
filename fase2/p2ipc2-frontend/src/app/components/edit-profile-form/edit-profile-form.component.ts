import {Component, Input} from '@angular/core';
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent {

  @Input() user!: UserModel;
  onSubmit() {
    console.log('Form submitted');
    const date = this.user.birthdate.slice(0, 10);
    const {birthdate, ...userData} = this.user;
    const newUser = {...userData, birthdate: date};
    console.log(newUser);
  }
}
