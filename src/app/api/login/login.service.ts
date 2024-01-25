// Api
import { apiUrl } from '..';

// Modules
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Types
import { PostLogin, PostLoginResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor (private http:HttpClient) {}

  createPost(form:PostLogin): Observable<PostLoginResponse> {
    return this.http.post<PostLoginResponse>(apiUrl, form);
  }

}
