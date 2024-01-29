// Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Types
import { PostRoleData, PostRoleResponse } from './roles.types';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor (private http:HttpClient) {}

  postRol (data:PostRoleData) {
    return this.http.post<PostRoleResponse>('/api/roles', data);
  }

}
