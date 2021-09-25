import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  getAnnouncements() {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/announcements/all';
    return this.http.get(url);
  }

  getSingleAnnouncement(announcementId: string, date: string) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/announcements/single';
    return this.http.get(url, { params: { announcementId, date } });
  }

  addAnnouncement(payload) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/announcements';
    return this.http.post(url, payload);
  }

  updateAnnouncement(payload) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/announcements';
    return this.http.put(url, payload);
  }
}
