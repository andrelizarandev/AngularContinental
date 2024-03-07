// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { 
  GetUserByIdResponse, 
  GetUserResponse, 
  PostUserData, 
  PutUserData 
} from './users.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor (private http:HttpClient) {}

  getUserApi () {
    return lastValueFrom(this.http.get<GetUserResponse>(`${apiUrl}/usuarios`));
  }

  submitUser (data:PostUserData) {
    return lastValueFrom(this.http.post(`${apiUrl}/register`, data));
  }

  deleteUserApi (id:number) {
    return lastValueFrom(this.http.delete(`${apiUrl}/usuarios/${id}`));
  }

  getUserByIdApi (id:string) {
    return lastValueFrom(this.http.get<GetUserByIdResponse>(`${apiUrl}/usuarios/${id}`));
  }

  putUserApi (data:PutUserData) {
    const { id_usuario, ...restData } = data;
    return lastValueFrom(this.http.put(`${apiUrl}/usuarios/${id_usuario}`, restData));
  }

}
