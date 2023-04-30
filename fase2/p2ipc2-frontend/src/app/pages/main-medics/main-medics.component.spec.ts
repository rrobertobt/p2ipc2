import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMedicsComponent } from './main-medics.component';

describe('MainMedicsComponent', () => {
  let component: MainMedicsComponent;
  let fixture: ComponentFixture<MainMedicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMedicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
