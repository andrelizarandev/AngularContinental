// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { PostMetodoData } from './metodo.types';

@Injectable({
  providedIn: 'root'
})
export class MetodoService {

  constructor(private http:HttpClient) { }

  postMetodoFromProduccionGeneralApi (data:PostMetodoData) {
    return lastValueFrom(this.http.patch(`${apiUrl}/metodo`, data));
  }
  
}
