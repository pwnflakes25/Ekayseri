import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DebtService } from 'src/app/shared/services/debt.service';

@Component({
  selector: 'app-my-debt',
  templateUrl: './my-debt.component.html',
  styleUrls: ['./my-debt.component.scss']
})
export class MyDebtComponent implements OnInit {
  totalDebt: number = 15;
  totalPaid: number = 50;
  userDebt$: Observable<any>;
  debts = []
  constructor(private authService: AuthService, private debtService: DebtService) { }

  ngOnInit(): void {
    this.fetchUserDebt()
  }

  async fetchUserDebt() {
    const currUserId = (await this.authService.getCurrentUserInfo()).attributes.sub;
    this.userDebt$ = this.debtService.getDebtOfUser(currUserId);
  }

}
