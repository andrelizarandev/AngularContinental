// Modules
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { injectMutation } from '@ngneat/query';

import { 
  GetSolicitudDisenoCursoData, 
  GetEapData, 
  GetFacultadData, 
  GetPlanData, 
  GetTipoAsignaturaData, 
  GetTipoDisenoData, 
} from './diseno-curso.types';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SolicitudDisenoCursoService {

  #http = inject(HttpClient);

  getEapList () {
    return lastValueFrom(this.#http.get<GetEapData[]>(`${apiUrl}/eap`));
  }

  getTipoAsignaturaList () {
    return lastValueFrom(this.#http.get<GetTipoAsignaturaData[]>(`${apiUrl}/tipo-asignaturas`));
  }

  getTipoDisenoList () {
    return lastValueFrom(this.#http.get<GetTipoDisenoData[]>(`${apiUrl}/tipo-disenos`));
  }

  getFacultadList () {
    return lastValueFrom(this.#http.get<GetFacultadData[]>(`${apiUrl}/facultades`));
  }

  getPlanList () {
    return lastValueFrom(this.#http.get<GetPlanData[]>(`${apiUrl}/planes`));
  }

  getDisenoCursoList () {
    return lastValueFrom(this.#http.get<GetSolicitudDisenoCursoData[]>(`${apiUrl}/solicitudes`));
  }

  getDisenoCursoById (id: number) {
    return lastValueFrom(this.#http.get<GetSolicitudDisenoCursoData[]>(`${apiUrl}/solicitudes`));
  }

}
