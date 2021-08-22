import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createProfile(payload: any) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri';
    return this.http.post(url, payload);
  }

  getProfiles() {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/all';
    return this.http.get(url, { observe: 'response' });
  }

  getProfile(token: string) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/single';
      return this.http.get(url, {params: {accessToken: token}});
  }
}
