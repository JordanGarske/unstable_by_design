import { TestBed } from '@angular/core/testing';

import { DjangoApiService } from './django-api.service';

describe('DjangoApiService', () => {
  let service: DjangoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DjangoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
