// Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Types
import { PostDisenoCursoData, PostDisenoCursoResponse } from './diseno-curso.types';
import { apiUrl } from '..';

@Injectable({
  providedIn: 'root'
})

export class DisenoCursoService {

  constructor (private http:HttpClient) {}

  postDisenoCurso (data:PostDisenoCursoData) {
    return this.http.post<PostDisenoCursoResponse>(`${apiUrl}/diseno-curso`, data);
  }

}
