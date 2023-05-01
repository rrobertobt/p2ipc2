import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InitialSetupMedicsService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(private http: HttpClient) { }

  finishSetup(requestBody: any){
    return this.http.post<void>(`${this.apiUrl}/initial-setup-medic`, requestBody);
  }
}
