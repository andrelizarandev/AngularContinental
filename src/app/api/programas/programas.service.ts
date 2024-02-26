// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetProgramaResponse, PostProgramaData, PutProgramaData } from './programas.types';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor (private http:HttpClient) {}

  getProgramasApi () {
    return lastValueFrom(this.http.get<GetProgramaResponse[]>(`${apiUrl}/programas`));
  }

  postProgramaApi (data:PostProgramaData) {
    return lastValueFrom(this.http.post(`${apiUrl}/programas`, data));
  }

  putProgramaApi (data:PutProgramaData) {
    const { id, ...restData } = data;
    return lastValueFrom(this.http.put(`${apiUrl}/programas/${data.id}`, restData));
  }

  deleteProgramaApi (id:number) {
    return lastValueFrom(this.http.delete(`${apiUrl}/programas/${id}`));
  }
  
}
