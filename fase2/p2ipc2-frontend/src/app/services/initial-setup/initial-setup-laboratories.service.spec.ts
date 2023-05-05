import { TestBed } from '@angular/core/testing';

import { InitialSetupLaboratoriesService } from './initial-setup-laboratories.service';

describe('InitialSetupLaboratoriesService', () => {
  let service: InitialSetupLaboratoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialSetupLaboratoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
