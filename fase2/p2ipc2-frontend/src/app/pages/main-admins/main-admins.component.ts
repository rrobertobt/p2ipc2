import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user/current-user.service";

@Component({
  selector: 'app-main-admins',
  templateUrl: './main-admins.component.html',
  styleUrls: ['./main-admins.component.css']
})
export class MainAdminsComponent implements OnInit {
  currentUser: UserModel | undefined
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser()
    if (!(this.currentUser && Object.keys(this.currentUser).length !== 0 && this.currentUserService.isAdmin())) {
      this.router.navigate(['/login']).then();
    }
  }
}
