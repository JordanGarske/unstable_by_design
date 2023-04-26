import { TestBed } from '@angular/core/testing';

import { CurrentUserStorageService } from './current-user-storage.service';

describe('CurrentUserStorageService', () => {
  let service: CurrentUserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
