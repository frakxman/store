import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { environments } from 'src/environments/environments';

import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;
  private users: User[] = [];
  private usersId: number[] = [];

  constructor( private http: HttpClient, private tokenService: TokenService ) { }

  login( username: string, password: string ) {
    return this.http.post<Auth>(`${ this.baseUrl }/login`, { username, password })
    .subscribe( resp => this.tokenService.saveToken( resp.access_token ));
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

  getUsers() {
    return this.http.get<User[]>(`${ this.baseUrl}`)
    .subscribe( users => {
      this.users = users; 
      this.usersId = this.users.map(( ids ) => ids.userId )
      console.log( this.usersId )
    });
  }

  userAuthenticated(): boolean {
    for (let i = 0; i < this.usersId.length; i++) {
     if (this.tokenService.getUserId() === this.usersId[i] ) {
      return true;
     }
    }
    return false;
  }

  userValidated(): Observable<boolean> {
    
    if( setTimeout(() => {
      this.userAuthenticated()
    }, 1000)) return of( true );

    return of( false );
  }
}
