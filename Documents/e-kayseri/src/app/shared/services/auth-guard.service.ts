import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate() {
    try {
      await this.authService.getCurrentUser();
      return true;
    } catch (error) {
      return this.router.createUrlTree(['/auth']);
    }
  }
}
