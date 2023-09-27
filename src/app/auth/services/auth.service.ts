import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environments } from 'src/environments/environments';

import { TokenResp } from '../interfaces/auth.interface';
import { User, UserResp } from '../interfaces/user.interface';

import { TokenService } from './token.service';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environments.baseUrl}/users`;
  user: TokenResp = {
    userId: 0,
    userName: '',
    email: '',
    access_token: ''
  };
  user$ = new BehaviorSubject<UserResp | null>( null );
 
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login( username: string, password: string ) { 
    return this.http.post<TokenResp>(`${ this.baseUrl }/login`, { username, password })
    .subscribe( resp => {
      this.user = resp;
      if( resp.access_token ) {
        this.tokenService.saveToken(this.user.access_token);
        this.router.navigate(['/admin/list']);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Usuario y/o Contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar de Nuevo'
        })
        this.router.navigate(['/auth/login']);
      }
    });
  }

  register( username: string, password: string, email: string ) {
    return this.http.post<User>(`${ this.baseUrl}/signup`, { username, password, email });
  }

  getUser(): Observable<any> {
    this.user$.next(this.user);
    return this.user$;
  }
}
