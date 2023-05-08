import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMedicsComponent } from './home-medics.component';

describe('HomeMedicsComponent', () => {
  let component: HomeMedicsComponent;
  let fixture: ComponentFixture<HomeMedicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMedicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
