import {Component, Input} from '@angular/core';
import {LogoutService} from "../../../services/logout/logout.service";

@Component({
  selector: 'app-laboratory-navbar',
  templateUrl: './laboratory-navbar.component.html',
  styleUrls: ['./laboratory-navbar.component.css']
})
export class LaboratoryNavbarComponent {
  @Input() userName?: string = 'Nombre Laboratorio';
  constructor(
    private logoutService: LogoutService
  ) { }

  logout() {
    this.logoutService.logout();
  }
}
