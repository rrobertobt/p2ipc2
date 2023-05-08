import {Component, OnInit} from '@angular/core';
import {LogoutService} from "../../../services/logout/logout.service";
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-patient-navbar',
  templateUrl: './patient-navbar.component.html',
  styleUrls: ['./patient-navbar.component.css']
})
export class PatientNavbarComponent implements OnInit {
  userName = 'Nombre Paciente';
  balance = 0;
  constructor(
    private currentUserService: CurrentUserService,
    private logoutService: LogoutService,
    private location: Location
  ) { }
  logout() {
    this.logoutService.logout();
  }

  ngOnInit(): void {
    this.initNavbar();
  }

  initNavbar() {
    const currentUser = this.currentUserService.getCurrentUser();
    if (currentUser) {
      this.userName = currentUser.name;
      this.balance = currentUser.balance;
    }
    this.currentUserService.getUserObservable().subscribe(
      updatedUser => {
        if (updatedUser) {
          this.userName = updatedUser.name;
          this.balance = updatedUser.balance;
        }
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
