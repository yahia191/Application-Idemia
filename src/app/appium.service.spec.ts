import { TestBed } from '@angular/core/testing';

import { AppiumService } from './appium.service';

describe('AppiumService', () => {
  let service: AppiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
