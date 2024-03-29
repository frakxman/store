import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

}
