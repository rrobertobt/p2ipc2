import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLaboratoriesComponent } from './main-laboratories.component';

describe('MainLaboratoriesComponent', () => {
  let component: MainLaboratoriesComponent;
  let fixture: ComponentFixture<MainLaboratoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLaboratoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
