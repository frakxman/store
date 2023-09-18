import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { environments } from 'src/environments/environments';

import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;
  private userId?: Auth | number; 
  private users: User[] = [];

  constructor( private http: HttpClient, private tokenService: TokenService ) { }

  login( username: string, password: string ) {
    return this.http.post<Auth>(`${ this.baseUrl }/login`, { username, password })
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

  getUsers() {
    return this.http.get<User[]>(`${ this.baseUrl}`).subscribe( resp => this.users = resp );
  }

  userValidated(): Observable<boolean> {
    if( this.tokenService.getToken() ) return of( true );
    return of( false );
  }
}
