// Modules
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Types
import { GetUserResponse, PostUserData, PostUserResponse } from './users.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  createUser (data:PostUserData):Observable<PostUserResponse> {
    return this.http.post<PostUserResponse>(`${apiUrl}register`, data);
  }

  getUserList ():Observable<GetUserResponse> {
    return this.http.get<GetUserResponse>(`${apiUrl}usuarios`);
  }

}
