import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-main-patients',
  templateUrl: './main-patient.component.html',
  styleUrls: ['./main-patient.component.css']
})
export class MainPatientComponent implements OnInit {

  currentUser: UserModel | undefined;
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser()
    if(!(this.currentUser && Object.keys(this.currentUser).length !== 0 && this.currentUserService.isPatient())){
      this.router.navigate(['/login']).then();
    }
  }

}
