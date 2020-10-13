import { TestBed } from '@angular/core/testing';

import { AdvertisingRequestService } from './advertising-request.service';

describe('AdvertisingRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvertisingRequestService = TestBed.get(AdvertisingRequestService);
    expect(service).toBeTruthy();
  });
});
