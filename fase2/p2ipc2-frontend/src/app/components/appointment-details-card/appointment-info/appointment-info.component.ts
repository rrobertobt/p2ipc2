import {Component, Input} from '@angular/core';
import {AppointmentModel} from "../../../models/appointment.model";

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.css']
})
export class AppointmentInfoComponent {
  @Input() appointment: AppointmentModel = {
    id: 0,
    medic_id: 0,
    patient_id: 0,
    speciality_id: 0,
    speciality_name: '',
    patient_name: '',
    date: '',
    schedule: '',
    status: '',
    report: '',
    price: 0,
    commission: 0,
    created_at: ''
  };
}
