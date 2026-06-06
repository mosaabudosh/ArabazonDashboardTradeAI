import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktestResults } from './backtest-results';

describe('BacktestResults', () => {
  let component: BacktestResults;
  let fixture: ComponentFixture<BacktestResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacktestResults],
    }).compileComponents();

    fixture = TestBed.createComponent(BacktestResults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
