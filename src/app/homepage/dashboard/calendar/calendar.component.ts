import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
dates: Date[];
today = new Date();

  constructor() { }

  ngOnInit(): void {
    this.generateDates();
  }

  generateDates() {
    const dates = [];
    const curr = new Date();
    for (let index = 0; index <= 6; index++) {
      dates.push(new Date(curr.setDate(curr.getDate() - curr.getDay()+index)));
    }
    this.dates = dates;
    console.log(dates);
  }

}
