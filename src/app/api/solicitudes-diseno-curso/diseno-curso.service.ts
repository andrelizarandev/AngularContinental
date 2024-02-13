// Modules
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { injectMutation, injectQuery } from '@ngneat/query';
import { GetSolicitudDisenoCursoData, GetEapData, GetFacultadData, GetPlanData, GetTipoAsignaturaData, GetTipoDisenoData, PostSolicitudDisenoCursoData, GetSolicitudDisenoCursoByIdResponse, SubmitSolicitudDisenoCursoFileData } from './diseno-curso.types';

@Injectable({
  providedIn: 'root'
})

export class SolicitudDisenoCursoService {

  #query = injectQuery();
  #http = inject(HttpClient);
  #mutation = injectMutation();

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

  getPlanList () {
    return this.#query({
      queryKey: ['get-planes'] as const,
      queryFn: () => this.#http.get<GetPlanData[]>(`${apiUrl}planes`)
    });
  }

  getDisenoCursoList () {
    return this.#query({
      queryKey: ['get-diseno-cursos'] as const,
      queryFn: () => this.#http.get<GetSolicitudDisenoCursoData[]>(`${apiUrl}solicitudes`)
    });
  }

  getDisenoCursoById (id: number) {
    return this.#query({
      queryKey: ['get-diseno-curso', id] as const,
      queryFn: () => this.#http.get<GetSolicitudDisenoCursoByIdResponse>(`${apiUrl}solicitudes/${id}`)
    });
  }

  submitSolicitudDisenoCurso () {
    return this.#mutation({
      mutationFn: (data:PostSolicitudDisenoCursoData) => this.#http.post(`${apiUrl}solicitud`, data)
    });
  }

  submitSolicitudDisenoCursoFile () {
    return this.#mutation({
      mutationFn: (data:SubmitSolicitudDisenoCursoFileData) => {
        const formData = new FormData();
        formData.append('archivo', data.file, 'archivo.xlsx');
        return this.#http.post(`${apiUrl}importar-excel`, formData);
      }
    });
  }

}
