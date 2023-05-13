import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionHistoryTableComponent } from './commission-history-table.component';

describe('CommissionHistoryTableComponent', () => {
  let component: CommissionHistoryTableComponent;
  let fixture: ComponentFixture<CommissionHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionHistoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
