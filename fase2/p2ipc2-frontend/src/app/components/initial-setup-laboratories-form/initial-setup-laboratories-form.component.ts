import {Component, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {Router} from "@angular/router";
import {TestTypeLaboratoryModel} from "../../models/test-type-laboratory.model";
import {MatDialog} from "@angular/material/dialog";
import {BasicInfoDialogComponent} from "../utils/basic-info-dialog/basic-info-dialog.component";
import {TestTypeModel} from "../../models/test-type.model";
import {InitialSetupLaboratoriesService} from "../../services/initial-setup/initial-setup-laboratories.service";

@Component({
  selector: 'app-initial-setup-laboratories-form',
  templateUrl: './initial-setup-laboratories-form.component.html',
  styleUrls: ['./initial-setup-laboratories-form.component.css']
})
export class InitialSetupLaboratoriesFormComponent {

  @Input() testTypes!: TestTypeLaboratoryModel[];
  displayedColumns: string[] = ['select', 'name', 'description', 'price'];
  constructor(
    private matSnackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private initialSetupLaboratoriesService: InitialSetupLaboratoriesService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  showDescriptionDialog(testType: TestTypeModel): void {
    this.dialog.open(BasicInfoDialogComponent, {
      data: {
        name: testType.name,
        description: testType.description
      },
      maxHeight: '50vh',
      maxWidth: '50vw',
    });
  }


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

    this.initialSetupLaboratoriesService.finishSetup(requestBody).subscribe(
      {
        next: (response) => {
          this.matSnackBar.open('Configuración inicial exitosa, por favor recarga la página para aplicar los cambios', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
          this.currentUserService.updateCurrentUser();
          this.router.navigate(['/main-laboratories']).then();
        },
        error: (error) => {
          console.log(error);
          this.matSnackBar.open('Error al configurar el laboratorio', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      }
    );
  }
}
