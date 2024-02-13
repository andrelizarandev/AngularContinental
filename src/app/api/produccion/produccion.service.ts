// Modules
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@ngneat/query';

// Api
import { apiUrl } from '..';

// Types
import { GetProduccionGeneralData, GetProduccionGeneralDataById } from './produccion.types';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  #query = injectQuery();
  #http = inject(HttpClient);
  #mutation = injectMutation();

  getProduccionGeneral () {
    return this.#query({
      queryKey: ['get-produccion-general'] as const,
      queryFn: () => this.#http.get<GetProduccionGeneralData[]>(`${apiUrl}produccion-general`)
    });
  }

  getProduccionGeneralById (id:string) {
    return this.#query({
      queryKey: ['get-produccion-general-by-id', id] as const,
      queryFn: () => this.#http.get<GetProduccionGeneralDataById>(`${apiUrl}produccion-general/${id}`)
    });
  }

}
