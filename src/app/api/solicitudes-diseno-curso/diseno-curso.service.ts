// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { 
  GetSolicitudDisenoCursoData, 
  GetEapData, 
  GetPlanData, 
  GetTipoAsignaturaData, 
  GetTipoDisenoData, 
} from './diseno-curso.types';
import { GetFacultadData } from '../reportes/reportes.types';

@Injectable({
  providedIn: 'root'
})

export class SolicitudDisenoCursoService {

  constructor (private http:HttpClient) {}

  getEapList () {
    return lastValueFrom(this.http.get<GetEapData[]>(`${apiUrl}/eap`));
  }

  getTipoAsignaturaList () {
    return lastValueFrom(this.http.get<GetTipoAsignaturaData[]>(`${apiUrl}/tipo-asignaturas`));
  }

  getTipoDisenoList () {
    return lastValueFrom(this.http.get<GetTipoDisenoData[]>(`${apiUrl}/tipo-disenos`));
  }

  getFacultadList () {
    return lastValueFrom(this.http.get<GetFacultadData[]>(`${apiUrl}/facultades`));
  }

  getPlanList () {
    return lastValueFrom(this.http.get<GetPlanData[]>(`${apiUrl}/planes`));
  }

  getDisenoCursoList () {
    return lastValueFrom(this.http.get<GetSolicitudDisenoCursoData[]>(`${apiUrl}/solicitudes`));
  }

  getDisenoCursoById (id: number) {
    return lastValueFrom(this.http.get<GetSolicitudDisenoCursoData[]>(`${apiUrl}/solicitudes`));
  }

}
