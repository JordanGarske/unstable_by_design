import { TestBed } from '@angular/core/testing';

import { RoleToChannelService } from './role-to-channel.service';

describe('RoleToChannelService', () => {
  let service: RoleToChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleToChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
