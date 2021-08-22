import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // convert promise to observable using 'from' operator
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    // if your getAuthToken() function declared as "async getAuthToken() {}"

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${(await this.authService.getSession()).getIdToken().getJwtToken()}`,
      },
    });

    // Important: Note the .toPromise()
    return next.handle(authReq).toPromise();
  }
}
