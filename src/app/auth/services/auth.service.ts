import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from 'src/environments/environments';

import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;
  private token?: Auth;
  private user?: User;
  private users?: User[] = [];

  constructor( private http: HttpClient ) { }

  login( username: string, password: string ) {
    return this.http.post<Auth>(`${ this.baseUrl }/login`, { username, password })
      .subscribe( token => {
        this.token = token;
        localStorage.setItem('token', this.token.access_token );
      })
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

  checkAuthentication(): Observable<boolean> {
    if ( !localStorage.getItem('token')) return of( false );

    // return of( true )
    //  this.http.get<User>(`${ this.baseUrl }`)
    // .subscribe( users => {
    //   this.users = users;
    //   for( let i = 0; i < this.users.length; i++ ) {
    //   }
    // })
    return this.http.get<User[]>(`${ this.baseUrl }`)  
      .pipe(
        tap( users => this.users = users ),
        map( user => !!user ),
        catchError( err => of( false ))
      );
  }

}
