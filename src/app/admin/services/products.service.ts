import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { environments } from 'src/environments/environments';

import { Product, UpdateProductDTO, UploadProductImage } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {

  private baseUrl: string = environments.baseUrl;
 
  constructor( private http: HttpClient ) {
  }

  ngOnInit(): void {}

  getAllProducts(page?: number, limit?: number) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    };
    return this.http.get<Product[]>(`${ this.baseUrl }/products`, { params } );
  }

  updateProduct(id: number, dto: UpdateProductDTO ) {
    return this.http.put<UpdateProductDTO>(`${this.baseUrl}/products/update-product/${id}`, dto )
  }

  updateProductImage(id: number, url: UploadProductImage ) {
    return this.http.put<UpdateProductDTO>(`${this.baseUrl}/products/update-photo/${id}`, url )
  }
}
