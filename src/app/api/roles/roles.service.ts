// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetRoleData, PostRoleData, PostRoleResponse } from './roles.types';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor (private http:HttpClient) {}

  getRolApi () {
    return lastValueFrom(this.http.get<GetRoleData[]>(`${apiUrl}/roles`));
  }

  postRol (data:PostRoleData) {
    return lastValueFrom(this.http.post<PostRoleResponse>(`${apiUrl}/roles`, data));
  }

}
