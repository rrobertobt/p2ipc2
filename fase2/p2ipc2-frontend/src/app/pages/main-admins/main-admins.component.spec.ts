import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminsComponent } from './main-admins.component';

describe('MainAdminsComponent', () => {
  let component: MainAdminsComponent;
  let fixture: ComponentFixture<MainAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
