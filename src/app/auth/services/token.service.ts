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

  islogged(): boolean {
    if( this.getToken() ) {
      return true;
    }
    return false;
  }

  getUserName(): string {
    if( !this.islogged() ) {
      return 'No user logged';
    }
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const userName = valuesJson.username;
    return userName;
  }

}
