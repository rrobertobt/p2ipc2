import {Component, Input} from '@angular/core';
import {SpecialityMedicModel} from "../../models/speciality-medic.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {InitialSetupMedicsService} from "../../services/initial-setup/initial-setup-medics.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BasicInfoDialogComponent} from "../utils/basic-info-dialog/basic-info-dialog.component";
import {SpecialityModel} from "../../models/speciality.model";

@Component({
  selector: 'app-initial-setup-medics-form',
  templateUrl: './initial-setup-medics-form.component.html',
  styleUrls: ['./initial-setup-medics-form.component.css']
})
export class InitialSetupMedicsFormComponent {

  @Input() specialities!: SpecialityMedicModel[];
  schedules: string[] = [];
  newSchedule = '';

  constructor(
    private matSnackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private initialSetupMedicsService: InitialSetupMedicsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['select', 'name', 'description', 'price'];
  showDescriptionDialog(speciality: SpecialityModel): void {
    this.dialog.open(BasicInfoDialogComponent, {
      data: {
        name: speciality.name,
        description: speciality.description
      },
      maxHeight: '50vh',
      maxWidth: '50vw',
    });
  }
  addSchedule() {
    console.log('Add schedule');
    if (this.newSchedule !== '') {
      const [start, end] = this.newSchedule.split('-');

      // Convert the start and end times to JavaScript Date objects
      const startDate = new Date(`1970-01-01T${start}:00`);
      const endDate = new Date(`1970-01-01T${end}:00`);

      // Add each hour as a separate schedule to the previous schedules
      for (let date = startDate; date <= endDate; date.setHours(date.getHours() + 1)) {
        const hour = date.toLocaleTimeString([], { hour: '2-digit', hour12: false });
        const newSchedule = `${hour}:00-${hour}:59`;
        const overlaps = this.schedules.some(previousSchedule => {
          const [startPrev, endPrev] = previousSchedule.split('-');
          const startPrevDate = new Date(`1970-01-01T${startPrev}:00`);
          const endPrevDate = new Date(`1970-01-01T${endPrev}:00`);
          return (date >= startPrevDate && date < endPrevDate);
        });
        if (overlaps) {
          this.matSnackBar.open('El horario se superpone con otro', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        } else {
          this.matSnackBar.open('Horario agregado', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
          this.schedules.push(newSchedule);
          this.newSchedule = '';
        }
      }
    }
  }
  // addSchedule() {
  //   console.log('Add schedule');
  //   if (this.newSchedule !== '') {
  //     const [startNew, endNew] = this.newSchedule.split('-').map(s => new Date(`1970-01-01T${s}:00`));
  //     const overlaps = this.schedules.some(previousSchedule => {
  //       const [startPrev, endPrev] = previousSchedule.split('-').map(s => new Date(`1970-01-01T${s}:00`));
  //       return (startNew < endPrev && endNew > startPrev);
  //     });
  //     if (!overlaps) {
  //       this.schedules.push(this.newSchedule);
  //       this.matSnackBar.open('Horario agregado', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
  //       this.newSchedule = '';
  //     } else {
  //       this.matSnackBar.open('El horario se superpone con otro', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
  //     }
  //   }
  // }

  onSubmit() {
    const medicId = this.currentUserService.getCurrentUser().medic_id
    const userId = this.currentUserService.getCurrentUser().id
    // check if there is at least one schedule and one speciality selected
    if (this.schedules.length === 0) {
      this.matSnackBar.open('Debes agregar al menos un horario', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }
    if (this.specialities.filter(s => s.selected).length === 0) {
      this.matSnackBar.open('Debes seleccionar al menos una especialidad y su precio', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }
    if (this.specialities.filter(s => s.selected && s.price === 0).length > 0) {
      this.matSnackBar.open('Debes asignar un precio a todas las especialidades seleccionadas', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }
    const selectedSpecialities = this.specialities.filter(s => s.selected).map(s => ({ id: s.id, price: s.price }));
    // change schedules from 08:00-08:59 to only 08:00
    const fixedSchedules = this.schedules.map(s => s.split('-')[0]);

    const requestBody = { schedules: fixedSchedules, specialities: selectedSpecialities, medic_id: medicId, user_id: userId };

    console.log(requestBody);
    // send request to backend
    this.initialSetupMedicsService.finishSetup(requestBody).subscribe(
      {
        next: (response) => {
          this.matSnackBar.open('Configuración inicial exitosa, por favor recarga la página para aplicar los cambios', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
          this.currentUserService.updateCurrentUser();
          this.router.navigate(['/main-medics/home']).then();
        },
        error: (error) => {
          console.log(error);
          this.matSnackBar.open('Hubo un error al configurar el médico', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      }
    );
  }
}
