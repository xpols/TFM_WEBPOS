import { TestBed } from '@angular/core/testing';

import { ZonaMesasService } from './zona-mesas.service';

describe('ZonaMesasService', () => {
  let service: ZonaMesasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonaMesasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
