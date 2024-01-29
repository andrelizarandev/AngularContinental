import { TestBed } from '@angular/core/testing';

import { DisenoCursoService } from './diseno-curso.service';

describe('DisenoCursoService', () => {
  let service: DisenoCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisenoCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
