import { TestBed } from '@angular/core/testing';

import { MyPharmasServiceService } from './my-pharmas-service.service';

describe('MyPharmasServiceService', () => {
  let service: MyPharmasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPharmasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
