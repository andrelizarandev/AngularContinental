import { TestBed } from '@angular/core/testing';

import { MetodoService } from './metodo.service';

describe('MetodoService', () => {
  let service: MetodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
