import {Component, OnInit} from '@angular/core';
import {BalanceRechargeService} from "../../services/balance-recharge/balance-recharge.service";
import {CurrentUserService} from "../../services/current-user/current-user.service";

@Component({
  selector: 'app-balance-history',
  templateUrl: './balance-history.component.html',
  styleUrls: ['./balance-history.component.css']
})
export class BalanceHistoryComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'date'];
  dataSource: any[] = [];

  constructor(
    private balanceRechargeService: BalanceRechargeService,
    private currentUserService: CurrentUserService
  ) { }
  // dataSource = [
  //   {amount: 100, date: new Date()},
  //   {amount: 50, date: new Date()},
  //   {amount: 200, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  //   {amount: 75, date: new Date()},
  // ];
  ngOnInit(): void {
    this.initBalanceHistory();
  }

  initBalanceHistory() {
    const currentUser = this.currentUserService.getCurrentUser();
    if (currentUser) {
      this.balanceRechargeService.getBalanceRechargeHistory(currentUser.id).subscribe({
        next: history => {
          this.dataSource = history;
        }
      });

      this.balanceRechargeService.getHistoryObservable().subscribe(
        history => {
          this.dataSource = history;
        }
      );
    }
  }
}
