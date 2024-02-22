// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetFormatosResponse } from './formatos.types';

@Injectable({
  providedIn: 'root'
})
export class FormatosService {

  constructor(private http:HttpClient) { }

  getFormatosApi (){
    return lastValueFrom(this.http.get<GetFormatosResponse>(`${apiUrl}/formatos`));
  }

}
