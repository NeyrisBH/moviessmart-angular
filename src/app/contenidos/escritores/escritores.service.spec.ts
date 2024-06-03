import { TestBed } from '@angular/core/testing';

import { EscritoresService } from './escritores.service';

describe('EscritoresService', () => {
  let service: EscritoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscritoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
