import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient ) { }

  getWareHouse() {
    return this.http.get(`${this.baseUrl}/warehouse/active-virtual-store?wareHouseId`);
   } 
 
}
