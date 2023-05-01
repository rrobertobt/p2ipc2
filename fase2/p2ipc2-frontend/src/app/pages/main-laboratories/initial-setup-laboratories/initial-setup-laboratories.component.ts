import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../services/current-user/current-user.service";

@Component({
  selector: 'app-initial-setup-laboratories',
  templateUrl: './initial-setup-laboratories.component.html',
  styleUrls: ['./initial-setup-laboratories.component.css']
})
export class InitialSetupLaboratoriesComponent implements OnInit {
  testTypes = [
    {name: 'Hematología', description: 'Hematología', selected: false, price: 0},
    {name: 'Química sanguínea', description: 'Química sanguínea', selected: false, price: 0},
    {name: 'Uroanálisis', description: 'Uroanálisis', selected: false, price: 0},
    {name: 'Coproparasitoscopía', description: 'Coproparasitoscopía', selected: false, price: 0},
    {name: 'Bacteriología', description: 'Bacteriología', selected: false, price: 0},
  ]
  alreadyCompleted = false;

  constructor(
    private currentUserService: CurrentUserService
  ) { }
  ngOnInit() {
    const currentUser = this.currentUserService.getCurrentUser()
    if (currentUser.initial_setup) {
      this.alreadyCompleted = true;
    }
  }

}
