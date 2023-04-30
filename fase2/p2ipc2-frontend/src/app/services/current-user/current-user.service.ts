import {Injectable} from '@angular/core';
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() {}

  public getCurrentUser(): UserModel {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }
  //todo: create user type checking methods here
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

}
