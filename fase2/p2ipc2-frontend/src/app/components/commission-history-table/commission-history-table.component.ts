import {Component, OnInit} from '@angular/core';
import {BalanceRechargeService} from "../../services/balance-recharge/balance-recharge.service";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {CommissionHistoryModel} from "../../models/commission-history.model";

@Component({
  selector: 'app-commission-history-table',
  templateUrl: './commission-history-table.component.html',
  styleUrls: ['./commission-history-table.component.css']
})
export class CommissionHistoryTableComponent implements OnInit {
  displayedColumns: string[] = ['start_date', 'end_date', 'new_commission'];
  dataSource: CommissionHistoryModel[] = [];
  constructor(
    private balanceRechargeService: BalanceRechargeService,
  ) { }

  ngOnInit(): void {
    this.initCommissionHistory();
  }

  initCommissionHistory() {
    this.balanceRechargeService.getCommissionHistory().subscribe({
      next: history => {
        this.dataSource = history;
      }
    });

    this.balanceRechargeService.getCommissionHistoryObservable().subscribe(
      history => {
        this.dataSource = history;
      }
    );
  }

}
