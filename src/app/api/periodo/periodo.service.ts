// Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';
import { GetPeriodoResponse } from './periodo.types';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor (private http:HttpClient) {}

  getPeriodoList () {
    return this.http.get<GetPeriodoResponse>(`${apiUrl}periodos`);
  }

}
