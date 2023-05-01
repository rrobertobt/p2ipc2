import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-main-medics',
  templateUrl: './main-medics.component.html',
  styleUrls: ['./main-medics.component.css']
})
export class MainMedicsComponent implements OnInit {
  currentUser: UserModel | undefined;
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
  ) { }
  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser()
    if(!(this.currentUser && Object.keys(this.currentUser).length !== 0 && this.currentUserService.isMedic())){
      this.router.navigate(['/login']).then();
    } else if ( !this.currentUserService.hasCompletedInitalSetup()) {
      this.router.navigate(['/main-medics/initial-setup']).then();
    }
  }

}
