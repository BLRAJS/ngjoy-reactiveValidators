import { TestBed } from '@angular/core/testing';

import { NgJoyValidatorsService } from './ng-joy-validators.service';

describe('NgJoyValidatorsService', () => {
  let service: NgJoyValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgJoyValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
