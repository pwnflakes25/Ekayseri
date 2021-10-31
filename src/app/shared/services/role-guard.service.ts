import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, url: any) {
    const token = (await this.authService.getSession())
      .getAccessToken()
      .getJwtToken();
    const userProfile = await this.profileService.getProfile(token).toPromise();

    // check if user not verified
    if (!userProfile[0].isVerified) {
      return this.router.createUrlTree(['/auth']);
    }

    if (!route.data.roles) {
      return true;
    }

    // check if role is included
    if (
      route.data.roles &&
      userProfile[0] &&
      userProfile[0].roles &&
      !userProfile[0].roles.some((role) => route.data.roles.includes(role))
    ) {
      return true;
    }

    // navigate to home if not
    return this.router.createUrlTree(['/']);
  }
}
