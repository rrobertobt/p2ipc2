import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupLaboratoriesFormComponent } from './initial-setup-laboratories-form.component';

describe('InitialSetupLaboratoriesFormComponent', () => {
  let component: InitialSetupLaboratoriesFormComponent;
  let fixture: ComponentFixture<InitialSetupLaboratoriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupLaboratoriesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialSetupLaboratoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
