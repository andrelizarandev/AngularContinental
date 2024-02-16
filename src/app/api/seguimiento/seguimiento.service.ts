// Modules
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { GetSeguimientoResponse } from './seguimiento.types';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  constructor() { }

  #http = inject(HttpClient);

  getSeguimientoList (id:string) {
    return lastValueFrom(this.#http.get<GetSeguimientoResponse>(`${apiUrl}/seguimiento/${id}`));
  }
  
}
