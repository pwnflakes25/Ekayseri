import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as d3 from 'd3';
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


  // ***** Pie chart data **********

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg;
  private margin = 20;
  private width = 300;
  private height = 300;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  // *************************************************

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(){
    this.switchForm();
    this.createSVG();
    this.createColors();
    this.drawChart();
  }

  toggleAuthForm() {
    this.isNewUser = !this.isNewUser;
    this.switchForm();
  }

  createSVG() {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.Stars.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(80)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text(d => d.data.Framework)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "start")
    .style("font-size", 12)
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
