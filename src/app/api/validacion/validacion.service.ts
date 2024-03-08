// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetValidacionResponse, PostCompletarValidacionData } from './validacion.types';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor (private http:HttpClient) {}

  getValidacionByProduccionGeneralId (id:string) {
    return lastValueFrom(this.http.get<GetValidacionResponse>(`${apiUrl}/validacion/${id}`))
  }

  putValidacionApi (id:number) {
    return lastValueFrom(this.http.post(`${apiUrl}/validacion/${id}`, {}));
  }

  postCompletarValidacionApi (data:PostCompletarValidacionData) {
    return lastValueFrom(this.http.post(`${apiUrl}/validacion`, data));
  }

}
