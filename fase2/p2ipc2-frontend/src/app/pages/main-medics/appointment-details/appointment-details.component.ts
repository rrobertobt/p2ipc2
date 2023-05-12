import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentModel} from "../../../models/appointment.model";
import {AppointmentsService} from "../../../services/appointments/appointments.service";
import {AppointmentTestTypeModel} from "../../../models/AppointmentTestTypeModel";
import {TestTypesService} from "../../../services/test-types/test-types.service";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  id = 0;
  appointment!: AppointmentModel;
  testTypes!: AppointmentTestTypeModel[];
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentsService,
    private testTypesService: TestTypesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    });
    this.appointmentService.getOneAppointment(this.id).subscribe({
      next: (response: any) => {
        this.appointment = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.testTypesService.getTestTypesForAppointmentFinalization().subscribe({
      next: (response: any) => {
        this.testTypes = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    }
  }
