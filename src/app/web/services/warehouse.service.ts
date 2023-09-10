import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';
import { WareHouse } from '../interfaces/wareHouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient ) { }

  getWareHouse() {
    return this.http.get<WareHouse>(`${this.baseUrl}/warehouses/active-virtual-store`);
  } 
}
