// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetProgramaResponse, PostProgramaData } from './programas.types';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor (private http:HttpClient) {}

  getProgramasApi () {
    return lastValueFrom(this.http.get<GetProgramaResponse[]>(`${apiUrl}/programas`));
  }

  submitProgramaApi (data:PostProgramaData) {
    return lastValueFrom(this.http.post(`${apiUrl}/programas`, data));
  }
  
}
