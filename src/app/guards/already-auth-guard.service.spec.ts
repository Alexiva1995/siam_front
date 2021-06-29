import { TestBed } from '@angular/core/testing';

import { AlreadyAuthGuardService } from './already-auth-guard.service';

describe('AlreadyAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlreadyAuthGuardService = TestBed.get(AlreadyAuthGuardService);
    expect(service).toBeTruthy();
  });
});
