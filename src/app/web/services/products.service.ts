import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Product } from '../interfaces/product.interfaces';

import { WarehouseService } from './warehouse.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {

  private baseUrl: string = environments.baseUrl;
  private wareHouseId = 1;

  constructor( 
    private http: HttpClient,
    private wareHouseService: WarehouseService,
  ) {}

  ngOnInit(): void {
    this.wareHouseService.getWareHouse().subscribe(({ warehouseId }) => this.wareHouseId = warehouseId );
  }

  getByCategory( categoryName: string, page: number, limit: number, descripcion: string ) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
      params = params.set('descripcion', descripcion);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${ this.wareHouseId }/${categoryName}`, { params });
  }

  getAllProducts(page?: number, limit?: number) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    };
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ this.wareHouseId }`, { params });
    // return this.http.get<Product[]>(`${this.baseUrl}/products/4`, { params });
  }

  getProductsByPage( page: number, limit: number ) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ this.wareHouseId }`, { params: { page, limit }});
  }
  
  getProductsBySearch( page: number, limit: number, description: string ) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ this.wareHouseId }`, { params: { page, limit, description }});
  }

  getOneProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/get-product/${id}/${ this.wareHouseId }`);
  }
}
