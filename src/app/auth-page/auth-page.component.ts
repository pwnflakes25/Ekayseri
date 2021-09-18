import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  isLoading: boolean;

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
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        username: ['', Validators.required],
      }, {
        Validators: this.checkPasswords
      })
    } else {
      this.authForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      })
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  async onSignup() {
    this.isLoading = true;
    const payload = this.authForm.value;
    try {
      const user = await this.authService.signUp(payload.email, payload.username, payload.password);
      if(user)  {
        await this.authService.signIn(payload.username, payload.password);
        this.isLoading = false;
        this.router.navigate(['/create-profile']);
      }
    } catch (error) {
      this.isLoading = false;
      alert(error.message);
      return;
    }
  }

  async onSignin() {
    this.isLoading = true;
    const payload = this.authForm.value;
    try {
      const user = await this.authService.signIn(payload.username, payload.password);
      this.isLoading = false;
      if(user) {
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.isLoading = false;
      alert(error.message);
      return;
    }
    
  }

}
