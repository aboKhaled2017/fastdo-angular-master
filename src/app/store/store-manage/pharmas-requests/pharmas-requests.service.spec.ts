import { TestBed } from '@angular/core/testing';

import { PharmasRequestsService } from './pharmas-requests.service';

describe('PharmasRequestsService', () => {
  let service: PharmasRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmasRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
