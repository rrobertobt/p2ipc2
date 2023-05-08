import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLaboratoriesComponent } from './home-laboratories.component';

describe('HomeLaboratoriesComponent', () => {
  let component: HomeLaboratoriesComponent;
  let fixture: ComponentFixture<HomeLaboratoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLaboratoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
