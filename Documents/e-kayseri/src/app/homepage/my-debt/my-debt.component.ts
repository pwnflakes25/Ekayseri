import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-debt',
  templateUrl: './my-debt.component.html',
  styleUrls: ['./my-debt.component.scss']
})
export class MyDebtComponent implements OnInit {
  totalDebt: number = 15;
  totalPaid: number = 50;
  debts = [
    {
      amount: 7,
      dateIssued: '1629458795',
      status: 'Unpaid'
    },
    {
      amount: 7,
      dateIssued: '1629372395',
      status: 'Paid'
    },
    {
      amount: 7,
      dateIssued: '1629458795',
      status: 'Paid'
    },
    {
      amount: 7,
      dateIssued: '1629285995',
      status: 'Paid'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
