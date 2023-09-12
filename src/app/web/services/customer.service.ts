import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from 'src/environments/environments';
import { Country } from '../interfaces/countries';
import { Municipalities } from '../interfaces/municipalities';
import { Departments } from '../interfaces/departments';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = environments.baseUrl

  constructor( private http: HttpClient) { }

  getCountries() {
    return this.http.get<Country[]>(`${ this.baseUrl}/countries`);
  }

  getDepartments() {
    return this.http.get<Departments[]>(`${ this.baseUrl}/departments`);
  }

  getMunicipalities() {
    return this.http.get<Municipalities[]>(`${ this.baseUrl}/municipalities`);
  }

}
