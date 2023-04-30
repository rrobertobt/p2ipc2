import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPatientComponent } from './main-patient.component';

describe('ManagementComponent', () => {
  let component: MainPatientComponent;
  let fixture: ComponentFixture<MainPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
