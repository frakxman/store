import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';

import { Product, UpdateProductDTO, UploadProductImage } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = `${environments.baseUrl}/products`;
 
  constructor( private http: HttpClient ) {
  }

  getAllProducts(page?: number, limit?: number) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    };
    return this.http.get<Product[]>(`${ this.baseUrl }`, { params } );
  }

  getOneProduct(id: number) {
    return this.http.get<UpdateProductDTO>(`${this.baseUrl}/get-product/${id}`);
  }

  editProduct(id: number, dto: UpdateProductDTO ) {
    return this.http.put<UpdateProductDTO>(`${this.baseUrl}/update-product/${id}`, dto );
  }

  updateProductImage(id: number, url: UploadProductImage ) {
    return this.http.put<UpdateProductDTO>(`${this.baseUrl}/update-photo/${id}`, url );
  }
}
