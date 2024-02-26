// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetRoleData, PostRoleData, PostRoleResponse, PutRoleData } from './roles.types';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor (private http:HttpClient) {}

  getRolesApi () {
    return lastValueFrom(this.http.get<GetRoleData[]>(`${apiUrl}/roles`));
  }

  postRol (data:PostRoleData) {
    return lastValueFrom(this.http.post<PostRoleResponse>(`${apiUrl}/roles`, data));
  }

  putRolApi (data:PutRoleData) {
    const { id, ...restData } = data;
    return lastValueFrom(this.http.put(`${apiUrl}/roles/${id}`, restData));
  }

  deleteRolApi (id:number) {
    return lastValueFrom(this.http.delete(`${apiUrl}/roles/${id}`));
  }

}
