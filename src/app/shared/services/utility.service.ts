import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  dateToISO(date: Date) {
    if(!(date instanceof Date)) {
      return;
    }
    return date.toISOString();
  }
}
