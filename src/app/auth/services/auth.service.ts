import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { environments } from 'src/environments/environments';

import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

import { TokenService } from './token.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;
  private userId?: Auth | number; 
  private users: User[] = [];
  private _currentUser: boolean = false;


  private http = inject( HttpClient );
  private tokenService = inject( TokenService );
  private userService = inject( UserService );

  login( username: string, password: string ) {
    return this.http.post<Auth>(`${ this.baseUrl }/login`, { username, password })
    .pipe(
      tap( token => this.tokenService.saveToken( token.access_token )),
      tap( userId => this.userId = userId.userId ),
    )
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

  userAuhtenticated(): Observable<boolean> {
    this.userService.getAll()
      .subscribe( userList => {this.users = userList} );
      console.log( this. users );
      for (let i = 0; i < this.users.length; i++) {
        if( this.userId === this.users[i].userId ) {
          console.log('inside for');
           return of( true );
        }
      }
      return of( false );
  }

}
