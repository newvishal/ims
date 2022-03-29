import { TestBed } from '@angular/core/testing';

import { UserRoleAccessService } from './user-role-access.service';

describe('UserRoleAccessService', () => {
  let service: UserRoleAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
