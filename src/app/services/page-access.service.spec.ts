import { TestBed } from '@angular/core/testing';

import { PageAccessService } from './page-access.service';

describe('PageAccessService', () => {
  let service: PageAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
