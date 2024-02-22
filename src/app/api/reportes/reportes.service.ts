// MOdules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetFacultadData, GetPorcentajeRealData, GetReportesData, GetReportesResponse } from './reportes.types';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor (private http:HttpClient) {}

  getReportesApi (id:string) {
    return lastValueFrom(this.http.get<GetReportesResponse>(`${apiUrl}/reporte/${id}`));
  }

  getFacultadesApi () {
    return lastValueFrom(this.http.get<GetFacultadData[]>(`${apiUrl}/facultades`));
  }

  getPorcentajeRealApi (id:string) {
    return lastValueFrom(this.http.get<GetPorcentajeRealData[]>(`${apiUrl}/metodos/${id}`));
  }

}
