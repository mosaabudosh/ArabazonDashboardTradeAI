import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeHistory } from './trade-history';

describe('TradeHistory', () => {
  let component: TradeHistory;
  let fixture: ComponentFixture<TradeHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
