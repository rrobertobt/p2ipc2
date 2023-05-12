import {Component, OnInit} from '@angular/core';
import {AppointmentsService} from "../../../services/appointments/appointments.service";
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import * as moment from "moment";

@Component({
  selector: 'app-home-medics',
  templateUrl: './home-medics.component.html',
  styleUrls: ['./home-medics.component.css']
})
export class HomeMedicsComponent implements OnInit {
  testData = [];
  selectedDate: Date | null = new Date();
  displayedColumns = ['id', 'speciality_name', 'patient_name', 'schedule', 'status', 'actions']
  constructor(
    private appointmentsService: AppointmentsService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    const medicId = this.currentUserService.getCurrentUser().medic_id
    const formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
    this.appointmentsService.getMedicAppointments({id: medicId, date: formattedDate}).subscribe({
      next: data => {
        this.testData = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    }
    );
  }
  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.fetchAppointments();
  }
}
