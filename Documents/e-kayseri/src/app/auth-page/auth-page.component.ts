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
      })
    } else {
      this.authForm = this.fb.group({
        email: [''],
        username: [''],
        password: [''],
      })
    }
  }

  onSignup() {
    this.router.navigate(['/create-profile', '123']);
  }

}
