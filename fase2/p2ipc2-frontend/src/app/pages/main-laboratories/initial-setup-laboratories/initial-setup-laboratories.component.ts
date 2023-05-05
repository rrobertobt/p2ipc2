import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {TestTypesService} from "../../../services/test-types/test-types.service";
import {TestTypeLaboratoryModel} from "../../../models/test-type-laboratory.model";

@Component({
  selector: 'app-initial-setup-laboratories',
  templateUrl: './initial-setup-laboratories.component.html',
  styleUrls: ['./initial-setup-laboratories.component.css']
})
export class InitialSetupLaboratoriesComponent implements OnInit {
  testTypes!: TestTypeLaboratoryModel[];
  alreadyCompleted = false;

  constructor(
    private currentUserService: CurrentUserService,
    private testTypesService: TestTypesService
  ) { }
  ngOnInit() {
    const currentUser = this.currentUserService.getCurrentUser()
    if (currentUser.initial_setup) {
      this.alreadyCompleted = true;
    }
    this.testTypesService.getTestTypes().subscribe((testTypeLaboratory: TestTypeLaboratoryModel[]) => {
      this.testTypes = testTypeLaboratory;
    });
  }

}
