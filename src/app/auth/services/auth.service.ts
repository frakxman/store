import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users/auth`;

  constructor( private http: HttpClient ) { }

  login( username: string, password: string ) {
    return this.http.post(`${ this.baseUrl }/login`, { username, password });
  }

}
