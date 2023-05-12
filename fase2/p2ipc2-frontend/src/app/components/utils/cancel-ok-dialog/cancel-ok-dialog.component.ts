import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cancel-ok-dialog',
  templateUrl: './cancel-ok-dialog.component.html',
  styleUrls: ['./cancel-ok-dialog.component.css']
})
export class CancelOkDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CancelOkDialogComponent>,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAppointment() {
    return true;
  }
}
