import { TestBed } from '@angular/core/testing';

import { LoginlogicoService } from './loginlogico.service';

describe('LoginlogicoService', () => {
  let service: LoginlogicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginlogicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
