import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../shared/services/auth.service"

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  isNewUser: boolean = false;
  authForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(){
    this.switchForm();
  }

  toggleAuthForm() {
    this.isNewUser = !this.isNewUser;
    this.switchForm();
  }

  switchForm() {
    if(this.isNewUser) {
      this.authForm = this.fb.group({
        email: [''],
        password: [''],
        username: [''],
      })
    } else {
      this.authForm = this.fb.group({
        username: [''],
        password: [''],
      })
    }
  }

  async onSignup() {
    const payload = this.authForm.value;
    const user = await this.authService.signUp(payload.email, payload.username, payload.password);
    if(user) {
      try {
        await this.authService.signIn(payload.username, payload.password);
        this.router.navigate(['/create-profile', '123']);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }

  async onSignin() {
    const payload = this.authForm.value;
    const user = await this.authService.signIn(payload.username, payload.password);
    if(user) {
      this.router.navigate(['/']);
    }
  }

}
