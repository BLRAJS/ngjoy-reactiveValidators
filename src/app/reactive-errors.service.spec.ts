import { TestBed } from '@angular/core/testing';

import { ReactiveErrorsService } from './reactive-errors.service';

describe('ReactiveErrorsService', () => {
  let service: ReactiveErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
