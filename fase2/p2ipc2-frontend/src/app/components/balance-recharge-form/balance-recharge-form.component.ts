import { Component } from '@angular/core';
import {BalanceRechargeService} from "../../services/balance-recharge/balance-recharge.service";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-balance-recharge-form',
  templateUrl: './balance-recharge-form.component.html',
  styleUrls: ['./balance-recharge-form.component.css']
})
export class BalanceRechargeFormComponent {
  newBalance = 0;

  constructor(
    private balanceRechargeService: BalanceRechargeService,
    private currentUserService: CurrentUserService,
    private snackBar: MatSnackBar
  ) { }
  onSubmit() {
    const request = {
      user_id: this.currentUserService.getCurrentUser().id,
      amount: this.newBalance
    }
    this.balanceRechargeService.rechargeBalance(request).subscribe({
      next: () => {
        this.snackBar.open('Saldo recargado con exito ', 'CERRAR', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.currentUserService.updateCurrentUser();
        this.balanceRechargeService.updateBalanceRechargeHistory(request.user_id);
      },
      error: () => {
        this.snackBar.open('Error al recargar saldo', 'CERRAR', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
