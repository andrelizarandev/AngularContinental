// Modules
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { injectQuery } from '@ngneat/query';
import { GetEapData, GetFacultadData, GetTipoAsignaturaData, GetTipoDisenoData } from './diseno-curso.types';

@Injectable({
  providedIn: 'root'
})

export class DisenoCursoService {

  #http = inject(HttpClient);
  #query = injectQuery();

  getEapList () {
    return this.#query({
      queryKey: ['get-eap'] as const,
      queryFn: () => this.#http.get<GetEapData[]>(`${apiUrl}eap`)
    });
  }

  getTipoAsignaturaList () {
    return this.#query({
      queryKey: ['get-tipo-asignaturas'] as const,
      queryFn: () => this.#http.get<GetTipoAsignaturaData[]>(`${apiUrl}tipo-asignaturas`)
    });
  }

  getTipoDisenoList () {
    return this.#query({
      queryKey: ['get-tipo-disenos'] as const,
      queryFn: () => this.#http.get<GetTipoDisenoData[]>(`${apiUrl}tipo-disenos`)
    });
  }

  getFacultadList () {
    return this.#query({
      queryKey: ['get-facultades'] as const,
      queryFn: () => this.#http.get<GetFacultadData[]>(`${apiUrl}facultades`)
    });
  }

}
