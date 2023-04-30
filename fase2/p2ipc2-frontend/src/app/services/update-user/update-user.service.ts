import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UpdateUserModel} from "../../models/update-user.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(
    private http: HttpClient,
  ) { }

  updateUser(newUser: UpdateUserModel){
    return this.http.put<UpdateUserModel>(`${this.apiUrl}/users/${newUser.id}`, newUser);
  }
}
