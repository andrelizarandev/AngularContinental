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
  GetSilabosFromProduccionGeneralResponse, 
  GetTipoDisenoData, 
  PostProduccionGeneralFileData, 
  PostSilaboFileData,
  PutProduccionGeneralData
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

  getSilabosFromProduccionGeneral (id:string) {
    return lastValueFrom(this.http.get<GetSilabosFromProduccionGeneralResponse>(`${apiUrl}/detalle-silabo/${id}`));
  }

  putProduccionGeneral (data:PutProduccionGeneralData) {
    const { id, ...restData } = data;
    return lastValueFrom(this.http.put(`${apiUrl}/produccion-general/${id}`, restData));
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

  getTipoDisenosApi () {
    return lastValueFrom(this.http.get<GetTipoDisenoData[]>(`${apiUrl}/tipo-disenos`));
  }

}
