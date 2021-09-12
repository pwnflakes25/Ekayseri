import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Debt {
  users: UserPaymentData[];
}

export interface UserPaymentData {
  authorName: string;
  authorId: string;
  name: string;
  amount: string;
  duration: string;
  date: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor(private http: HttpClient) { }

  getDebts(fromDate: string, toDate: string) {
    const url = 'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/payments/getBetweenDate';
    return this.http.get(url, {params: {isPaged: 'false', fromDate, toDate}});
  }

  getSingleDebt(paymentId: string) {
    const url = 'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/payments/single';
    return this.http.get(url, {params: {isPaged: 'true', paymentId}});
  }

  getDebtOfUser(userId: string) {
    const url = 'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/payments/getByUser';
    return this.http.get(url, {params: {isPaged: 'false', userId}});
  }

  verifyDebt(payload: {toBePaid: {paidStatus: boolean, paymentId: string, date: string}[]}) {
    const url = 'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/payments';
    return this.http.put(url, payload)
  }

  postDebt(payload: Debt) {
    const url = 'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/payments';
    return this.http.post(url, payload);
  }
}
