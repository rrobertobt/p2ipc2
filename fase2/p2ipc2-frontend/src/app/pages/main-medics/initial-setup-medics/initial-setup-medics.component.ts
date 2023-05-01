import {Component, OnInit} from '@angular/core';
import {SpecialityMedicModel} from "../../../models/speciality-medic.model";
import {SpecialitiesService} from "../../../services/specialities/specialities.service";
import {CurrentUserService} from "../../../services/current-user/current-user.service";

@Component({
  selector: 'app-initial-setup-medics',
  templateUrl: './initial-setup-medics.component.html',
  styleUrls: ['./initial-setup-medics.component.css']
})
export class InitialSetupMedicsComponent implements OnInit {

  specialities!: SpecialityMedicModel[];
  alreadyCompleted = false;

  constructor(
    private specialityService: SpecialitiesService,
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit() {
    const currentUser = this.currentUserService.getCurrentUser()
    if (currentUser.initial_setup) {
      this.alreadyCompleted = true;
    }
    this.specialityService.getSpecialities().subscribe((specialityMedic: SpecialityMedicModel[]) => {
      this.specialities = specialityMedic;
    });
  }

}
