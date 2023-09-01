import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Product } from '../interfaces/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient ) { }

  getByCategory(categoryName?: string, page?: number, limit?: number ) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/categories/4/${categoryName}`, { params });
  }

  getAllProducts(page?: number, limit?: number) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/products/4`, { params });
  }

  getProductsByPage( page: number, limit: number ) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/4`, { params: { page, limit }});
  }

  getOneProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/get-product/${id}/4`);
  }

  // uptdateProduct() {}


}
