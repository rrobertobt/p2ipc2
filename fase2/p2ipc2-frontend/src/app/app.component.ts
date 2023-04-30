import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isNotFound = false;
  loggedIn = false;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isNotFound = (event.urlAfterRedirects === '/404');
      }
    });
  }

  logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser !== '{}') {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']).then();
      this.loggedIn = false;
    }
  }
}
