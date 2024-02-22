// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetModalidadesResponse } from './modalidades.types';

@Injectable({
  providedIn: 'root'
})
export class ModalidadesService {

  constructor (private http: HttpClient) {}

  getModalidadesApi () {
    return lastValueFrom(this.http.get<GetModalidadesResponse>(`${apiUrl}/modalidades`));
  }


}
