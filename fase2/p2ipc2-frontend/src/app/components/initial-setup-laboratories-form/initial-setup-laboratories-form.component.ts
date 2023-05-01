import {Component, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-initial-setup-laboratories-form',
  templateUrl: './initial-setup-laboratories-form.component.html',
  styleUrls: ['./initial-setup-laboratories-form.component.css']
})
export class InitialSetupLaboratoriesFormComponent {

  @Input() testTypes: any[] = []
  displayedColumns: string[] = ['select', 'name', 'description', 'price'];
  constructor(
    private matSnackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  onSubmit() {
    const laboratoryId = this.currentUserService.getCurrentUser().laboratory_id
    const userId = this.currentUserService.getCurrentUser().id
    // check if there is at least one schedule and one speciality selected
    if (this.testTypes.filter(s => s.selected).length === 0) {
      this.matSnackBar.open('Debes seleccionar al menos un tipo de prueba y su precio', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }
    if (this.testTypes.filter(s => s.selected && s.price === 0).length > 0) {
      this.matSnackBar.open('Debes asignar un precio a todos los tipos de prueba seleccionados', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }
    const selectedTestTypes = this.testTypes.filter(s => s.selected).map(s => ({ id: s.id, price: s.price }));
    const requestBody = { test_types: selectedTestTypes, laboratory_id: laboratoryId, user_id: userId };
    // send request to backend (is not ready yet, so we just log the request body, show snackbar and redirect to main page)
    console.log(requestBody);
    this.matSnackBar.open('Configuración inicial exitosa, por favor recarga la página para aplicar los cambios', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
    this.router.navigate(['/main-laboratories']).then();
  }


}
