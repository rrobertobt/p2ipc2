import { Component } from '@angular/core';
import {BalanceRechargeService} from "../../../services/balance-recharge/balance-recharge.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  constructor(
    private balanceRechargeService: BalanceRechargeService,
    private snack: MatSnackBar
  ) {}
  saveNewCommission(value: number) {
    const newCommission = value / 100;
    console.log(value);
    this.balanceRechargeService.updateAdminCommission(newCommission).subscribe({
      next: () => {
        this.snack.open('Comisión actualizada', 'CERRAR', {duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'});
        this.balanceRechargeService.updateCommissionHistory();
      },
      error: () => {
        this.snack.open('Error al actualizar la comisión', 'CERRAR', {duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'});
      }
    });
  }
}
