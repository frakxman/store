import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { environments } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class OrdersService implements OnInit {

  private baseUrl: string = `${environments.baseUrl}/commercial-orders`;

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {}

  getOrderNumber( id: number ) {
    return this.http.get(`${ this.baseUrl }/${ id }`);
  }

  generateOrder( body: any ) {
    return this.http.post(`${ this.baseUrl }`, body );
  }

  getConfirmOrder( orderNumber: number, wareHouseId: number ) {
    return this.http.get(`${ this.baseUrl }/${ orderNumber }/${ wareHouseId }`);
  }

  payOrder( orderNumber: number, wareHouseId: number ) {
    return this.http.post(`${ this.baseUrl }/payment/${ orderNumber }/${ wareHouseId}`, '');
  }

}
