import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environments } from 'src/environments/environments';

import { TokenResp } from '../interfaces/auth.interface';
import { User, UserResp } from '../interfaces/user.interface';

import { TokenService } from './token.service';
import { UserService } from './user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;
  private currentUser?: UserResp;
  private users: User[] = [];
  email = '';
 
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  login( username: string, password: string ) { 
    return this.http.post<TokenResp>(`${ this.baseUrl }/login`, { username, password })
      .pipe(
        tap( resp => {
          this.currentUser = resp;
          console.log( this.currentUser );
        })
      )
      .subscribe( resp => {
        if( resp.access_token ) {
        this.tokenService.saveToken(resp.access_token);
        this.router.navigate(['/admin/list']);
        } else {
          console.log('User error');
          this.router.navigate(['/auth/login']);
        }
      });
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

  assignUsers() {
    this.userService.getUsers().subscribe( resp => {
      this.users = resp;
    });
  }

  userValid(): boolean {
    for (const user of this.users) {
      if( this.currentUser === user ) {
        console.log('Inside');
        return true;
      }
    }
    return false;   
  }

}
