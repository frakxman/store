import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';
import { WareHouse } from '../interfaces/wareHouse.interface';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  baseUrl: string = `${environments.baseUrl}/warehouses`;

  constructor( private http: HttpClient ) { }

  getWareHouse() {
    return this.http.get<WareHouse>(`${this.baseUrl}/active-virtual-store`);
  } 
}
