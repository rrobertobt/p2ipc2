import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupMedicsFormComponent } from './initial-setup-medics-form.component';

describe('InitialSetupMedicsFormComponent', () => {
  let component: InitialSetupMedicsFormComponent;
  let fixture: ComponentFixture<InitialSetupMedicsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupMedicsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialSetupMedicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
