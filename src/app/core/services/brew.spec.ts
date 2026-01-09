import { TestBed } from '@angular/core/testing';

import { Brew } from './brew';

describe('Brew', () => {
  let service: Brew;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Brew);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
