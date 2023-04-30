import { Component, Input } from '@angular/core';
import {LogoutService} from "../../../services/logout/logout.service";

@Component({
  selector: 'app-patient-navbar',
  templateUrl: './patient-navbar.component.html',
  styleUrls: ['./patient-navbar.component.css']
})
export class PatientNavbarComponent {

  @Input() userName?: string = 'Nombre Paciente';
  constructor(
    private logoutService: LogoutService
  ) { }

  logout() {
    this.logoutService.logout();
  }
}
