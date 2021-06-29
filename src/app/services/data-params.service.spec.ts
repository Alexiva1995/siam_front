import { TestBed } from '@angular/core/testing';

import { DataParamsService } from './data-params.service';

describe('DataParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataParamsService = TestBed.get(DataParamsService);
    expect(service).toBeTruthy();
  });
});
