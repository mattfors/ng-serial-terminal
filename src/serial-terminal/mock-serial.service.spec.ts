import { TestBed } from '@angular/core/testing';

import { MockSerialService } from './mock-serial.service';
import { SerialService } from './serial.service';

describe('MockSerialService', () => {
  let service: MockSerialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SerialService, useClass: MockSerialService },
      ]
    });
    service = TestBed.inject(SerialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
