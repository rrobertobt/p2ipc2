import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewUserModel} from "../../models/new-user.model";
import {catchError, throwError} from "rxjs";
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(private http: HttpClient) { }

  register(newUser: NewUserModel){
    return this.http.post<NewUserModel>(`${this.apiUrl}/register`, newUser);
  }
}
