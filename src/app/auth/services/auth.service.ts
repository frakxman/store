import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environments } from 'src/environments/environments';

import { AuthResp } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;
  private users: User[] = [];
 
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login( username: string, password: string ) { 
    return this.http.post<AuthResp>(`${ this.baseUrl }/login`, { username, password })
      .subscribe( resp => {
        this.tokenService.saveToken(resp.access_token);
        this.router.navigate(['/admin/list']);
      });
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

}
