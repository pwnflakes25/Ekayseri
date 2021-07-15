import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service"

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(){}

}
