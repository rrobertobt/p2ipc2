import { TestBed } from '@angular/core/testing';

import { InitialSetupMedicsService } from './initial-setup-medics.service';

describe('InitialSetupMedicsService', () => {
  let service: InitialSetupMedicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialSetupMedicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
