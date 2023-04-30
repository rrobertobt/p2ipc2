import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    if (currentUser && Object.keys(currentUser).length !== 0) {
      const type = currentUser.type;
      switch (type) {
        case 'patient':
          this.router.navigate(['/main-patients']).then();
          break;
        case 'medic':
          this.router.navigate(['/main-medics']).then();
          break;
        case 'laboratory':
          this.router.navigate(['/main-laboratories']).then();
          break;
        case 'admin':
          this.router.navigate(['/main-admins']).then();
          break;
        default:
          this.router.navigate(['/login']).then();
      }
    }
  }

}
