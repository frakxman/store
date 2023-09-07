import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';

import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;

  constructor( private http: HttpClient ) { }

  login( username: string, password: string ) {
    return this.http.post<Auth>(`${ this.baseUrl }/login`, { username, password });
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

  profile() {
    return this.http.get<User[]>(`${ this.baseUrl}`);
  }

}
