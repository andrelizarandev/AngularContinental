// Modules
import { injectMutation, injectQuery } from '@ngneat/query';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// Api
import { apiUrl } from '..';

// Types
import { GetUserResponse } from './users.types';

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
      queryFn: () => this.#http.get<GetUserResponse>(`${apiUrl}usuarios`)
    });
  }

  submitUser () {
    return this.#mutation({
      mutationFn: (user: any) => this.#http.post(`${apiUrl}register`, user)
    });
  }

}
