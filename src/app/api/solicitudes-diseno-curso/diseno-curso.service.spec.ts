import { TestBed } from '@angular/core/testing';

import { SolicitudDisenoCursoService } from './diseno-curso.service';

describe('DisenoCursoService', () => {
  let service: SolicitudDisenoCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDisenoCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
