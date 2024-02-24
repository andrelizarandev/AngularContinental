// Modules
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@ngneat/query';

// Api
import { apiUrl } from '..';

// Types
import { GetUserResponse, PostUserData } from './users.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #http = inject(HttpClient);
  #query = injectQuery();
  #mutation = injectMutation();

  getUserList () {
    return this.#query({
      queryKey: ['get-users'] as const,
      queryFn: () => this.#http.get<GetUserResponse>(`${apiUrl}/usuarios`)
    });
  }

  submitUser (data:PostUserData) {
    return lastValueFrom(this.#http.post(`${apiUrl}/register`, data));
  }

}
