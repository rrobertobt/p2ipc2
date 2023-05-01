import {Injectable} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(
    private http: HttpClient,
  ) {}

  public getCurrentUser(): UserModel {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  public updateCurrentUser(): void {
    const currentUserId = this.getCurrentUser().id;
    const newUser = this.http.get<UserModel>(`${this.apiUrl}/users/${currentUserId}`).subscribe({
      next: (response) => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(response));
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

  public hasCompletedInitalSetup(): boolean {
      const currentUser = this.getCurrentUser();
      return currentUser.initial_setup;
  }

}
