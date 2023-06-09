import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../services/current-user/current-user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  currentUser = this.currentUserService.getCurrentUser();
  currentType = this.currentUserService.getCurrentUser().type;
  constructor (
    private currentUserService: CurrentUserService,
  ) {}

  ngOnInit() {
    this.currentUser = this.currentUserService.getCurrentUser();
    this.currentType = this.currentUserService.getCurrentUser().type;
    this.currentUser.birthdate = new Date(this.currentUser.birthdate).toISOString();
  }
}
