import {Component, OnInit} from '@angular/core';
import {AppointmentModel} from "../../../models/appointment.model";
import {AppointmentsService} from "../../../services/appointments/appointments.service";
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home-patients',
  templateUrl: './home-patients.component.html',
  styleUrls: ['./home-patients.component.css']
})
export class HomePatientsComponent implements OnInit {
  appointments: AppointmentModel[] = [];
  displayedColumns = ['id', 'speciality_name', 'medic_name', 'date', 'status', 'report']

  constructor(
    private appointmentsService: AppointmentsService,
    private currentUserService: CurrentUserService,
  ) {}

  ngOnInit(): void {
    this.appointmentsService.getPatientAppointments(this.currentUserService.getCurrentUser().patient_id).subscribe({
      next: data => {
        this.appointments = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
