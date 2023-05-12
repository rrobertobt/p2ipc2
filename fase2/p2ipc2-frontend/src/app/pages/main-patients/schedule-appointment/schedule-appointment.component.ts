import {Component, OnInit} from '@angular/core';
import {MedicService} from "../../../services/medic/medic.service";
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {MatDialog} from "@angular/material/dialog";
import {CancelOkDialogComponent} from "../../../components/utils/cancel-ok-dialog/cancel-ok-dialog.component";
import {scheduled} from "rxjs";
import {AppointmentsService} from "../../../services/appointments/appointments.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {
  constructor(
    private medicService: MedicService,
    private currentUserService: CurrentUserService,
    private appointmentService: AppointmentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  appointmentDate = new Date();
  dataSource = [];
  availableHours: string[] = [];
  displayedColumns = ['speciality_name', 'medic_name', 'price', 'create'];
  selectedMedic?:{medic_id: number, medic_name: string, speciality_id: number, speciality_name: string, price: number };
  params = {}

  onMedicSelected(medic: {medic_id: number, medic_name: string, speciality_id: number, speciality_name: string, price: number }) {
    this.selectedMedic = medic;
    const params = {
      medic_id: medic.medic_id,
      date: this.appointmentDate.toISOString().slice(0, 10)
    }
    this.medicService.getMedicSchedules(params).subscribe({
      next: (data: string[]) => {
        this.availableHours = data;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CancelOkDialogComponent, {
      data: {
        confirm: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  canCreateAppointment(price: number): boolean {
    return this.currentUserService.getCurrentUser().balance >= price;
  }

  ngOnInit(): void {
    this.medicService.getAllMedicsSpecialities().subscribe({
      next: (data: any) => {
        this.dataSource = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
 // notes:
  // add the money to the medic
  // add the determined percentage of the money to the administrator
  // add the appointment to the database
  resetSelectedMedic() {
    this.selectedMedic = undefined;
  }


  scheduleAppointment(schedule: string) {
    if (!this.selectedMedic) {
      return;
    }
    const dialogRef = this.dialog.open(CancelOkDialogComponent, {data: {
        confirm: true
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.params = {
          medic_id: this.selectedMedic?.medic_id,
          speciality_id: this.selectedMedic?.speciality_id,
          patient_id: this.currentUserService.getCurrentUser().patient_id,
          date: this.appointmentDate.toISOString().slice(0, 10),
          schedule: schedule,
          report: '',
          price: this.selectedMedic?.price
        }
        this.appointmentService.createAppointment(this.params).subscribe({
          next: (data: any) => {
            console.log(data);
            this.resetSelectedMedic();
            this.currentUserService.updateCurrentUser();
            this.snackBar.open('Cita creada exitosamente', 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          error: (error: any) => {
            console.log(error);
            this.snackBar.open('Error al crear la cita', 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        });
      }
    })
  }
}
