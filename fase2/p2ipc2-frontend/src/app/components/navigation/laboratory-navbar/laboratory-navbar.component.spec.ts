import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryNavbarComponent } from './laboratory-navbar.component';

describe('LaboratoryNavbarComponent', () => {
  let component: LaboratoryNavbarComponent;
  let fixture: ComponentFixture<LaboratoryNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
