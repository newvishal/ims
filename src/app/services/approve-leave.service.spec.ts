import { TestBed } from '@angular/core/testing';

import { ApproveLeaveService } from './approve-leave.service';

describe('ApproveLeaveService', () => {
  let service: ApproveLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
