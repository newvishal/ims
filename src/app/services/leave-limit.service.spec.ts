import { TestBed } from '@angular/core/testing';

import { LeaveLimitService } from './leave-limit.service';

describe('LeaveLimitService', () => {
  let service: LeaveLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
