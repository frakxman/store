import { HttpClient } from '@angular/common/http';
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

}
