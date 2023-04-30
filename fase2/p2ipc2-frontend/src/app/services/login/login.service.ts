import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<any>(`${this.apiUrl}/login`, {username, password});
  }
}
