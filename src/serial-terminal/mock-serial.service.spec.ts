import { TestBed } from '@angular/core/testing';

import { MockSerialService } from './mock-serial.service';

describe('MockSerialService', () => {
  let service: MockSerialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockSerialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
