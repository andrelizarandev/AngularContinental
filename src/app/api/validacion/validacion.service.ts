// Modules
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { GetValidacionResponse } from './validacion.types';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor (private http:HttpClient) {}

  getValidacionByProduccionGeneralId (id:string) {
    return lastValueFrom(this.http.get<GetValidacionResponse>(`${apiUrl}/validacion/${id}`))

  }
}
