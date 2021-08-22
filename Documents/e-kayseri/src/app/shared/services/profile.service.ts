import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  createProfile(payload: any) {
    const url = "https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri";
    return this.http.post(url, payload);
  }

  getProfile() {
    const url = "https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/single";
    return this.http.get(url);
  }
}
