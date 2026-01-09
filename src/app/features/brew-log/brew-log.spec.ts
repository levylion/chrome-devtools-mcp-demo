import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewLog } from './brew-log';

describe('BrewLog', () => {
  let component: BrewLog;
  let fixture: ComponentFixture<BrewLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrewLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrewLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
