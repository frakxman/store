import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';

import { CreateUserDTO, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environments.baseUrl}/users`;
  
  constructor( private http: HttpClient ) { }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(`${this.baseUrl}/login`, dto);
  }

  getUsers() {
    return this.http.get<User[]>(`${ this.baseUrl}`)
     
  }
}
