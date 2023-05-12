import {Component, Input, OnInit} from '@angular/core';
import {AppointmentModel} from "../../models/appointment.model";
import {AppointmentTestTypeModel} from "../../models/AppointmentTestTypeModel";
import {AppointmentsService} from "../../services/appointments/appointments.service";
import {MatDialog} from "@angular/material/dialog";
import {BasicInfoDialogComponent} from "../utils/basic-info-dialog/basic-info-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-details-card',
  templateUrl: './appointment-details-card.component.html',
  styleUrls: ['./appointment-details-card.component.css']
})
export class AppointmentDetailsCardComponent {
  @Input() appointment!: AppointmentModel;
  @Input() testTypes!: AppointmentTestTypeModel[];
  finalReport = '';
  displayedColumns = ['id','selected', 'name', 'description',];

  constructor(
    private appointmentService: AppointmentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  showDescriptionDialog(testType: any) {
    this.dialog.open(BasicInfoDialogComponent, {
      data: {
        name: testType.name,
        description: testType.description
      },
      maxHeight: '50vh',
      maxWidth: '50vw',
    });

  }

  finishAppointment() {
    const selectedTestTypes = this.testTypes.filter(testType => testType.selected).map(testType => ({appointment_id: this.appointment.id, test_type_id: testType.id}));
    const updateBody = {
      appointment_tests: selectedTestTypes,
      report: this.finalReport,
    }

    this.appointmentService.updateAppointment(this.appointment.id, updateBody).subscribe({
      next: (response: any) => {
        this.snackBar.open('Consulta finalizada', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['/main-medics/home']).then();
      },
      error: (error: any) => {
        this.snackBar.open('Error al finalizar la cita', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        console.log(error);
      }
    }
    )
  }
}
