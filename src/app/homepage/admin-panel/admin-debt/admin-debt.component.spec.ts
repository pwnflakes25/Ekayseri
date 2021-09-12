import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDebtComponent } from './admin-debt.component';

describe('AdminDebtComponent', () => {
  let component: AdminDebtComponent;
  let fixture: ComponentFixture<AdminDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
