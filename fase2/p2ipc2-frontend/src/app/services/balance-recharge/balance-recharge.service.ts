import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BalanceRechargeService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  private historySubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }
  rechargeBalance(requestBody: {amount: number, user_id: number}){
    return this.http.post<void>(`${this.apiUrl}/balance-recharge/${requestBody.user_id}`, requestBody);
  }

  getBalanceRechargeHistory(user_id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/balance-recharge/${user_id}`)
  }

  updateBalanceRechargeHistory(user_id: number) {
    this.http.get<any[]>(`${this.apiUrl}/balance-recharge/${user_id}`).subscribe({
      next: (response) => {
        this.historySubject.next(response);
      }
    });
  }

  getHistoryObservable(): BehaviorSubject<any> {
    return this.historySubject;
  }
}
