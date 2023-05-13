import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {MedicService} from "../../../services/medic/medic.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-schedules-form',
  templateUrl: './schedules-form.component.html',
  styleUrls: ['./schedules-form.component.css']
})
export class SchedulesFormComponent implements OnInit {
  schedules: string[] = [];
  newSchedule: string = '';
  constructor(
    private currentUserService: CurrentUserService,
    private medicService: MedicService,
    private snackBar: MatSnackBar
  ) {}

  addSchedule() {
    if (this.newSchedule.trim() !== '') {
      if (!this.newSchedule.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)) {
        this.snackBar.open('El horario debe tener el formato HH:00', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        return;
        }
      if (this.schedules.indexOf(this.newSchedule) === -1) {
        this.schedules.push(this.newSchedule);
        this.newSchedule = '';
      } else {
        this.snackBar.open('El horario ya está agregado', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    }
  }

  ngOnInit() {
    this.medicService.getMedicAllSchedules({medic_id: this.currentUserService.getCurrentUser().medic_id}).subscribe({
      next: (schedules) => {
        this.schedules = schedules;
      }
    });
  }

  removeSchedule(index: number) {
    // at least one schedule must be present
    if (this.schedules.length === 1) {
      this.snackBar.open('Debe haber al menos un horario', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    this.schedules.splice(index, 1);
  }

  saveSchedules() {
    // done: implemented in backend
    this.medicService.updateMedicSchedules({medic_id: this.currentUserService.getCurrentUser().medic_id, schedules: this.schedules}).subscribe({
      next: (response: any) => {
        this.snackBar.open('Horarios actualizados', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.schedules = response;
      },
      error: () => {
        this.snackBar.open('Error al actualizar horarios, verificalos', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
