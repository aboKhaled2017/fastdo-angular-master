import { TestBed } from '@angular/core/testing';

import { DrugsServiceService } from './drugs-service.service';

describe('DrugsServiceService', () => {
  let service: DrugsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
