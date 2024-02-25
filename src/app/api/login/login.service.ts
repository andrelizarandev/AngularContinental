// Modules
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Api
import { apiUrl } from '..';

// Texts
import { continentalToken } from '../../data/data.texts';

// Types
import { PostLoginData, PostLoginResponse } from './login.types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor (private http:HttpClient) {}

  loginApi (form:PostLoginData) {
    return lastValueFrom(this.http.post<PostLoginResponse>(`${apiUrl}/login`, form));
  }

  validateTokenApi () {
    const currentToken = localStorage.getItem(continentalToken);
    return lastValueFrom(this.http.get<PostLoginResponse>(`${apiUrl}/validate-token`, {
      headers: { 'Authorization': `Bearer ${currentToken}` }
    }));
  }

}
