import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
declare const M: any;

@Component({
  selector: 'app-register-profile-process',
  templateUrl: './register-profile-process.component.html',
  styleUrls: ['./register-profile-process.component.scss']
})
export class RegisterProfileProcessComponent implements OnInit{
// @ViewChild('datePicker', {static: true}) elems: ElementRef;

currentStep: number = 1;

  constructor() { }

  ngOnInit(): void {
  }


  onNextStep() {
    if (this.currentStep !== 3) {
      this.currentStep += 1;
    }
  }

  onPreviousStep() {
    if(this.currentStep !== 1) {
      this.currentStep -= 1;
    }
  }

}
