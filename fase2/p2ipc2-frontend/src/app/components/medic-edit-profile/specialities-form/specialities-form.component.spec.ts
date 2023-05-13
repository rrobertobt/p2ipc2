import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitiesFormComponent } from './specialities-form.component';

describe('SpecialitiesFormComponent', () => {
  let component: SpecialitiesFormComponent;
  let fixture: ComponentFixture<SpecialitiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialitiesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
