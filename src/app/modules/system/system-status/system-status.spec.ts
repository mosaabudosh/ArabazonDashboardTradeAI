import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatusComponent as SystemStatus } from './system-status';

describe('SystemStatus', () => {
  let component: SystemStatus;
  let fixture: ComponentFixture<SystemStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
