import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatch } from './add-batch';

describe('AddBatch', () => {
  let component: AddBatch;
  let fixture: ComponentFixture<AddBatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
