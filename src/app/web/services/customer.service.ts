import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Country } from '../interfaces/countries';
import { Municipalities } from '../interfaces/municipalities';
import { Departments } from '../interfaces/departments';
import { CustomerResp, Nit, updateCustomerDto } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient) { }

  searchCustomer( nit: Nit ) {
    return this.http.post<CustomerResp>(`${ this.baseUrl}/customers/search`, nit );
  }

  createCustomer( body: updateCustomerDto ) {
    return this.http.post<updateCustomerDto>(`${ this.baseUrl}/customers`, body );
  }

  updateCustomer( id: number, body: updateCustomerDto ) {
    return this.http.put<updateCustomerDto>(`${ this.baseUrl}/customers/${id}`, body );
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
