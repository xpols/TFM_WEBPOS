import { TestBed } from '@angular/core/testing';

import { MainSalesService } from './main-sales.service';

describe('MainSalesService', () => {
  let service: MainSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
