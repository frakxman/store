import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;
  
  constructor( 
    private http: HttpClient,
  ) {}

  getByCategory( warehouseId: number, categoryName: string, page: number, limit: number, descripcion: string ) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
      params = params.set('descripcion', descripcion);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${ warehouseId }/${ categoryName }`, { params });
  }

  getAllProducts(warehouseId: number, page?: number, limit?: number) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    };
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ warehouseId }`, { params });
  }

  getProductsByPage( warehouseId: number, page: number, limit: number ) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ warehouseId }`, { params: { page, limit }});
  }
  
  getProductsBySearch( warehouseId: number, page: number, limit: number, description: string ) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ warehouseId }`, { params: { page, limit, description }});
  }

  getOneProduct(id: number, warehouseId: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/get-product/${ id }/${ warehouseId }`);
  }
}
