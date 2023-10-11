import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Country } from '../interfaces/countries';
import { Municipalities } from '../interfaces/municipalities';
import { Departments } from '../interfaces/departments';
import { CustomerResp, Nit, CustomerDto } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient) { }

  searchCustomer( nit: Nit ) {
    return this.http.post<CustomerResp>(`${ this.baseUrl}/customers/search`, nit );
  }

  createCustomer( body: CustomerDto ) {
    return this.http.post<any>(`${ this.baseUrl}/customers`, body );
  }

  updateCustomer( id: string, body: CustomerDto ) {
    return this.http.put<CustomerDto>(`${ this.baseUrl}/customers/update-customer/${id}`, body );
  }

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
