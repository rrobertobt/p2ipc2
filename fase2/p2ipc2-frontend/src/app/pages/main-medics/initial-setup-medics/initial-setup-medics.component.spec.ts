import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupMedicsComponent } from './initial-setup-medics.component';

describe('InitialSetupMedicsComponent', () => {
  let component: InitialSetupMedicsComponent;
  let fixture: ComponentFixture<InitialSetupMedicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupMedicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialSetupMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
