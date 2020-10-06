import { TestBed } from '@angular/core/testing';

import { PartOfCityService } from './part-of-city.service';

describe('PartOfCityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartOfCityService = TestBed.get(PartOfCityService);
    expect(service).toBeTruthy();
  });
});
