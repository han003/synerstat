import { TestBed } from '@angular/core/testing';

import { SynerLinkService } from './syner-link.service';

describe('SynerLinkService', () => {
  let service: SynerLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynerLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
