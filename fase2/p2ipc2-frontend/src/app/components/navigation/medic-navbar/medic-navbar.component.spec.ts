import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicNavbarComponent } from './medic-navbar.component';

describe('MedicNavbarComponent', () => {
  let component: MedicNavbarComponent;
  let fixture: ComponentFixture<MedicNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
