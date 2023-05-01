import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupLaboratoriesComponent } from './initial-setup-laboratories.component';

describe('InitialSetupLaboratoriesComponent', () => {
  let component: InitialSetupLaboratoriesComponent;
  let fixture: ComponentFixture<InitialSetupLaboratoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupLaboratoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialSetupLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
