import {Component, Input} from '@angular/core';
import {SpecialityMedicModel} from "../../models/speciality-medic.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {InitialSetupMedicsService} from "../../services/initial-setup/initial-setup-medics.service";
import {Router} from "@angular/router";

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
    private router: Router
  ) {}

  displayedColumns: string[] = ['select', 'name', 'description', 'price'];
  addSchedule() {
    console.log('Add schedule');
    if (this.newSchedule !== '') {
      const [startNew, endNew] = this.newSchedule.split('-').map(s => new Date(`1970-01-01T${s}:00`));
      const overlaps = this.schedules.some(previousSchedule => {
        const [startPrev, endPrev] = previousSchedule.split('-').map(s => new Date(`1970-01-01T${s}:00`));
        return (startNew < endPrev && endNew > startPrev);
      });
      if (!overlaps) {
        this.schedules.push(this.newSchedule);
        this.matSnackBar.open('Horario agregado', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        this.newSchedule = '';
      } else {
        this.matSnackBar.open('El horario se superpone con otro', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
      }
    }
  }

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
    const requestBody = { schedules: this.schedules, specialities: selectedSpecialities, medic_id: medicId, user_id: userId };

    // send request to backend
    this.initialSetupMedicsService.finishSetup(requestBody).subscribe(
      {
        next: (response) => {
          this.matSnackBar.open('Configuración inicial exitosa, por favor recarga la página para aplicar los cambios', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
          this.currentUserService.updateCurrentUser();
          this.router.navigate(['/main-medics']).then();
        },
        error: (error) => {
          console.log(error);
          this.matSnackBar.open('Hubo un error al configurar el médico', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      }
    );
  }
}
