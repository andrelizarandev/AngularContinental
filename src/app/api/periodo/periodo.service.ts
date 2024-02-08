// Modules
import { injectQuery } from '@ngneat/query';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { GetPeriodoResponse } from './periodo.types';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  #http = inject(HttpClient);
  #query = injectQuery();

  getPeriodoList () {
    return this.#query({
      queryKey: ['get-periodos'] as const,
      queryFn: () => this.#http.get<GetPeriodoResponse>(`${apiUrl}periodos`)
    });
  }

}
