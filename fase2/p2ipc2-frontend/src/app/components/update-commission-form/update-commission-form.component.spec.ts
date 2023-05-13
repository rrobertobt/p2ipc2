import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommissionFormComponent } from './update-commission-form.component';

describe('UpdateCommissionFormComponent', () => {
  let component: UpdateCommissionFormComponent;
  let fixture: ComponentFixture<UpdateCommissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCommissionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCommissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
