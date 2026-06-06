import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktestFormComponent as BacktestForm } from './backtest-form';

describe('BacktestForm', () => {
  let component: BacktestForm;
  let fixture: ComponentFixture<BacktestForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacktestForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BacktestForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
