import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-update-commission-form',
  templateUrl: './update-commission-form.component.html',
  styleUrls: ['./update-commission-form.component.css']
})
export class UpdateCommissionFormComponent {
  @Output() commissionEmitter = new EventEmitter<number>();
  newCommission = 1;

  saveNewCommission() {
    this.commissionEmitter.emit(this.newCommission);
    this.newCommission = 1;
  }
}
