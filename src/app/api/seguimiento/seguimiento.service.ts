// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetSeguimientoResponse } from './seguimiento.types';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  constructor (private http:HttpClient) {}

  getSeguimientoList (id:string) {
    return lastValueFrom(this.http.get<GetSeguimientoResponse>(`${apiUrl}/seguimiento/${id}`));
  }
  
}
