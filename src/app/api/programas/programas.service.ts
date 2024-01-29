// Modules
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

  postPrograma (data:PostProgramaData) {
    return this.http.post<GetProgramaResponse>(`${apiUrl}/programas`, data);
  }
  
}
