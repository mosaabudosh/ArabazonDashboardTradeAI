import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsListComponent as SignalsList } from './signals-list';

describe('SignalsList', () => {
  let component: SignalsList;
  let fixture: ComponentFixture<SignalsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignalsList],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
