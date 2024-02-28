// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { 
  GetMetodoByProduccionGeneralIdModalidadAndFormatoData, 
  GetMetodoData, 
  PostMetodoData 
} from './metodo.types';

@Injectable({
  providedIn: 'root'
})
export class MetodoService {

  constructor(private http:HttpClient) { }

  patchMetodoFromProduccionGeneralApi (data:PostMetodoData) {
    return lastValueFrom(this.http.patch(`${apiUrl}/metodo`, data));
  }

  getMetodoWithModalidadAndFormato (data:GetMetodoByProduccionGeneralIdModalidadAndFormatoData) {
    const { formato, id_produccion_general, modalidad } = data;
    return lastValueFrom(this.http.get<GetMetodoData>(`${apiUrl}/metodos/${id_produccion_general}/${modalidad}/${formato}`));
  }
  
}
