import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getProfiles(token: string) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/all';
    return this.http.get(url, {params: {accessToken: token}});
  }

  getKayseriUserProfiles(token: string) {
    const url =
    'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/filtered';
    return this.http.get(url,  {params: {accessToken: token}});
  }

  getProfile(token: string) {
    const url =
      'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri/single';
      return this.http.get(url, {params: {accessToken: token}});
  }

  updateProfile(payload) {
    const url = 'https://p7fzv5b9q5.execute-api.eu-central-1.amazonaws.com/dev/ekayseri';
    return this.http.put(url, payload);
  }
}
