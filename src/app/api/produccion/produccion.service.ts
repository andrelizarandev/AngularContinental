// Modules
import { lastValueFrom } from 'rxjs'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { 
  GetProduccionGeneralData, 
  GetProduccionGeneralDataById, 
  PostProduccionGeneralFileData, 
  PostSilaboFileData
} from './produccion.types';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  constructor (private http:HttpClient) {}

  getProduccionGeneral () {
    return lastValueFrom(this.http.get<GetProduccionGeneralData[]>(`${apiUrl}/produccion-general`));
  }

  getProduccionGeneralById (id:string) {
    return lastValueFrom(this.http.get<GetProduccionGeneralDataById>(`${apiUrl}/produccion-general/${id}`));
  }

  submitProduccionGeneralFile (data:PostProduccionGeneralFileData) {
    const formData = new FormData();
    formData.append('archivo', data.file);
    return lastValueFrom(this.http.post<PostProduccionGeneralFileData>(`${apiUrl}/importar-excel`, formData));
  }

  submitSilaboFile (data:PostSilaboFileData) {
    const formData = new FormData();
    formData.append('archivo', data.file);
    formData.append('id_produccion_general', data.id_produccion_general.toString());
    return lastValueFrom(this.http.post<PostProduccionGeneralFileData>(`${apiUrl}/silabo`, formData));
  }

}
