// Modules
import { injectQuery } from '@ngneat/query';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { GetProgramaResponse, PostProgramaData } from './programas.types';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  #http = inject(HttpClient);
  #query = injectQuery();

  postPrograma (data:PostProgramaData) {}

  getProgramasList () {
    return this.#query({
      queryKey: ['get-programas'] as const,
      queryFn: () => this.#http.get<GetProgramaResponse>(`${apiUrl}programas`)
    });
  }
  
}
