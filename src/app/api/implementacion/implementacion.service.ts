// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetImplementacionByIdData } from './implementacion.types';

@Injectable({
  providedIn: 'root'
})
export class ImplementacionService {

  constructor (private http:HttpClient) {}

  getImplementacionByIdApi (id:string) {
    return lastValueFrom(this.http.get<GetImplementacionByIdData>(`${apiUrl}/implementacion/${id}`));
  }

}
