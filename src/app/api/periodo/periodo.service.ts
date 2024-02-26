// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetPeriodoData, PostPeriodoData, PutPeriodoData } from './periodo.types';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) { }

  getPeriodosApi () {
    return lastValueFrom(this.http.get<GetPeriodoData[]>(`${apiUrl}/periodos`));
  } 

  postPeriodoApi (data:PostPeriodoData) {
    return lastValueFrom(this.http.post(`${apiUrl}/periodos`, data));
  }

  putPeriodoApi (data:PutPeriodoData) {
    return lastValueFrom(this.http.put(`${apiUrl}/periodos`, data));
  }

  deletePeriodoApi (id:number) {
    return lastValueFrom(this.http.delete(`${apiUrl}/periodos/${id}`));
  }

}
