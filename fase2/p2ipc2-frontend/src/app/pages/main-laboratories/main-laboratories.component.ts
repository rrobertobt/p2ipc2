import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-main-laboratories',
  templateUrl: './main-laboratories.component.html',
  styleUrls: ['./main-laboratories.component.css']
})
export class MainLaboratoriesComponent implements OnInit {
  currentUser: UserModel | undefined;
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser()
    if(!(this.currentUser && Object.keys(this.currentUser).length !== 0 && this.currentUserService.isLaboratory())){
      this.router.navigate(['/login']).then();
    } else if ( !this.currentUserService.hasCompletedInitalSetup()) {
      this.router.navigate(['/main-laboratories/initial-setup']).then();
    }
  }

}
