import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
userProfile: Observable<any>;
  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  async fetchProfile() {
    const token = (await this.authService.getSession()).getAccessToken().getJwtToken();
    this.userProfile = this.profileService.getProfile(token);
  }

}
