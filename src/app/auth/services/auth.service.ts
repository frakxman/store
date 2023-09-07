import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

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
  private user = new BehaviorSubject<User | null>( null );
  private usersId: User[] = [] ;
  private userId?: Auth | number; 

  user$ = this.user.asObservable();

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

  

}
