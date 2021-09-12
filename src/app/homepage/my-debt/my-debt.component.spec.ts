import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDebtComponent } from './my-debt.component';

describe('MyDebtComponent', () => {
  let component: MyDebtComponent;
  let fixture: ComponentFixture<MyDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
