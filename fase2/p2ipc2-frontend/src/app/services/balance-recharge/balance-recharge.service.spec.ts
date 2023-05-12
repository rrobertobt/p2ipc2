import { TestBed } from '@angular/core/testing';

import { BalanceRechargeService } from './balance-recharge.service';

describe('BalanceRechargeService', () => {
  let service: BalanceRechargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceRechargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
