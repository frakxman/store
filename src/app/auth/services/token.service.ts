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

  getUserId(): number {
    const user = this.getToken();
    const payload = user!.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const userId = valuesJson.sub;
    console.log( userId );
    return userId;
  }

  getUserName(): string {
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const userName = valuesJson.username;
    console.log( userName );
    return userName;
  }

}
