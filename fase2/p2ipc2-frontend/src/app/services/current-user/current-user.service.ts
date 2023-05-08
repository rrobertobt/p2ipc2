import {Injectable} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';

  private userSubject = new BehaviorSubject<any>(null);
  constructor(
    private http: HttpClient,
  ) {}

  public getCurrentUser(): UserModel {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  public updateCurrentUser(): void {
    console.log('updating current user');
    const currentUserId = this.getCurrentUser().id;
    const newUser = this.http.get<UserModel>(`${this.apiUrl}/users/${currentUserId}`).subscribe({
      next: (response) => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.userSubject.next(JSON.parse(localStorage.getItem('currentUser') ?? '{}'));
        console.log(response);
      }
    });
  }

  public isPatient(): boolean {
      const currentUser = this.getCurrentUser();
      return currentUser.type === 'patient';
  }

  public isMedic(): boolean {
      const currentUser = this.getCurrentUser();
      return currentUser.type === 'medic';
  }

  public isLaboratory(): boolean {
      const currentUser = this.getCurrentUser();
      return currentUser.type === 'laboratory';
  }

  public isAdmin(): boolean {
      const currentUser = this.getCurrentUser();
      return currentUser.type === 'administrator';
  }

  public hasCompletedInitalSetup(): boolean {
      const currentUser = this.getCurrentUser();
      return currentUser.initial_setup;
  }

  getUserObservable(): BehaviorSubject<any> {
    return this.userSubject;
  }

}
