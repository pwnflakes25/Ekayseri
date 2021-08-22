import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  dateToUnix(date: Date) {
    if(!(date instanceof Date)) {
      return;
    }
    return (date.getTime() / 1000).toFixed(0);
  }
}
