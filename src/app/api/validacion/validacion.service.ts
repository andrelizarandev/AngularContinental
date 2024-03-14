// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { 
  GetCompletarValidacionResponse, 
  GetValidacionResponse, 
  PostCompletarValidacionData, 
  PostEmailWhenGotSomeObservationsData
} from './validacion.types';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor (private http:HttpClient) {}

  getValidacionByProduccionGeneralId (id:string) {
    return lastValueFrom(this.http.get<GetValidacionResponse>(`${apiUrl}/validacion/${id}`))
  }

  getConfirmarValidacionApi (id:string) {
    return lastValueFrom(this.http.get<GetCompletarValidacionResponse>(`${apiUrl}/validaciones/${id}`));
  }

  putValidacionApi (id:number) {
    return lastValueFrom(this.http.post(`${apiUrl}/validacion/${id}`, {}));
  }

  postCompletarValidacionApi (data:PostCompletarValidacionData) {
    const { id_produccion_general, ...restData } = data;
    return lastValueFrom(this.http.patch(`${apiUrl}/validaciones/${id_produccion_general}`, restData));
  }

  postEmailWhenGotSomeObservations (data:PostEmailWhenGotSomeObservationsData) {
    return lastValueFrom(this.http.post(`${apiUrl}/observacionesvalidacion-correo`, data));
  }

}
