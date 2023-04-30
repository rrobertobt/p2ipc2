import {Component, Input} from '@angular/core';
import {LogoutService} from "../../../services/logout/logout.service";

@Component({
  selector: 'app-medic-navbar',
  templateUrl: './medic-navbar.component.html',
  styleUrls: ['./medic-navbar.component.css']
})
export class MedicNavbarComponent {
  @Input() userName?: string = 'Nombre Medico';
  constructor(
    private logoutService: LogoutService
  ) { }

  logout() {
    this.logoutService.logout();
  }
}
