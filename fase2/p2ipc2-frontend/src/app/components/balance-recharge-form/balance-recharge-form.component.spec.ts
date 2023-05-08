import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceRechargeFormComponent } from './balance-recharge-form.component';

describe('BalanceRechargeFormComponent', () => {
  let component: BalanceRechargeFormComponent;
  let fixture: ComponentFixture<BalanceRechargeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceRechargeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceRechargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
