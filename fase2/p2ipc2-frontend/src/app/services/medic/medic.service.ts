import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(private http: HttpClient) { }

  getMedicSchedules(params: { date: string; medic_id: number }) {
    return this.http.get<string[]>(`${this.apiUrl}/medics-schedules/${params.medic_id}/${params.date}`);
  }

  getAllMedicsSpecialities() {
    return this.http.get<any[]>(`${this.apiUrl}/medics-specialities`);
  }
}
