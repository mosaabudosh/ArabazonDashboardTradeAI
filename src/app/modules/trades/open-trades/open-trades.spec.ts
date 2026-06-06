import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTradesComponent as OpenTrades } from './open-trades';

describe('OpenTrades', () => {
  let component: OpenTrades;
  let fixture: ComponentFixture<OpenTrades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenTrades],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenTrades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
