import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface EventObject {
  eventTitle: string;
  eventDuration: string;
  eventDescription: string;
  authorName: string;
  authorId: string;
  eventLocation: string;
  date: string;
  tags: string[];
}

export interface JoinEvent {
  eventId: string;
  date: string;
  participant: [{
    userName: string;
    userId: string;
  }]
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  createEvent(payload: EventObject) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/events';
    return this.http.post(url, payload);
  }

  editEvent(payload: EventObject) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/events/update';
    return this.http.put(url, payload);
  }

  getEvents() {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/events/all';
    return this.http.get(url);
  }

  getEvent(eventId: string, date: string) {
    const url =
    'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/events/single';
    return this.http.get(url, {params: {eventId, date}})
  }

  deleteEvent(eventId: string, date: string) {
    const url =
    'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/events';
    return this.http.delete(url, {params: {eventId, date}});
  }

  joinEvent(payload: JoinEvent) {
    const url =
    'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/events/add';
    return this.http.put(url, payload);
  }
}
