import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentModel} from "../../models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(private http: HttpClient) { }

  createAppointment(params: any) {
    return this.http.post<any>(`${this.apiUrl}/appointments`, params);
  }

  getMedicAppointments(params: any) {
    return this.http.get<any>(`${this.apiUrl}/medics/${params.id}/appointments/${params.date}`);
  }

  getPatientAppointments(id: number) {
    return this.http.get<AppointmentModel[]>(`${this.apiUrl}/patients/${id}/appointments`);
  }

  getOneAppointment(id: number) {
    return this.http.get<AppointmentModel>(`${this.apiUrl}/appointments/${id}`);
  }

  updateAppointment(id: number, params: any) {
    return this.http.put<any>(`${this.apiUrl}/appointments/${id}`, params);
  }
}
