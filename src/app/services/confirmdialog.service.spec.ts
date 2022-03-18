import { TestBed } from '@angular/core/testing';

import { ConfirmdialogService } from './confirmdialog.service';

describe('ConfirmdialogService', () => {
  let service: ConfirmdialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmdialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
