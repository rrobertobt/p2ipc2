import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BalanceRechargeService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  private historySubject = new BehaviorSubject<any>(null);
  private commissionHistorySubject = new BehaviorSubject<any>(null)
  constructor(private http: HttpClient) { }
  rechargeBalance(requestBody: {amount: number, user_id: number}){
    return this.http.post<void>(`${this.apiUrl}/balance-recharge/${requestBody.user_id}`, requestBody);
  }

  getBalanceRechargeHistory(user_id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/balance-recharge/${user_id}`)
  }

  getCommissionHistory() {
    return this.http.get<any[]>(`${this.apiUrl}/balance-recharge/commissions-history`);
  }

  updateCommissionHistory() {
    this.http.get<any[]>(`${this.apiUrl}/balance-recharge/commissions-history`).subscribe({
      next: (response) => {
        this.commissionHistorySubject.next(response);
      }
    });
  }

  updateBalanceRechargeHistory(user_id: number) {
    this.http.get<any[]>(`${this.apiUrl}/balance-recharge/${user_id}`).subscribe({
      next: (response) => {
        this.historySubject.next(response);
      }
    });
  }

  updateAdminCommission(newCommission: number) {
    return this.http.put<any>(`${this.apiUrl}/balance-recharge`, {percentage: newCommission});
  }

  getHistoryObservable(): BehaviorSubject<any> {
    return this.historySubject;
  }

  getCommissionHistoryObservable(): BehaviorSubject<any> {
    return this.commissionHistorySubject;
  }
}
