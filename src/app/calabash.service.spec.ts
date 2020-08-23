import { TestBed } from '@angular/core/testing';

import { CalabashService } from './calabash.service';

describe('CalabashService', () => {
  let service: CalabashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalabashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
