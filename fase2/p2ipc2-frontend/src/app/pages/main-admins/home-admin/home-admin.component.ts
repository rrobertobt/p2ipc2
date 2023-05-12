import { Component } from '@angular/core';
import {BalanceRechargeService} from "../../../services/balance-recharge/balance-recharge.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  newCommission = 1;

  constructor(
    private balanceRechargeService: BalanceRechargeService,
    private snack: MatSnackBar
  ) {
  }
  saveNewCommission() {
    const value = this.newCommission / 100;
    this.newCommission = 1;
    this.balanceRechargeService.updateAdminCommission(value).subscribe({
      next: () => {
        this.snack.open('Comisión actualizada', 'CERRAR', {duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'});
      },
      error: () => {
        this.snack.open('Error al actualizar la comisión', 'CERRAR', {duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'});
      }
    });
  }
}
