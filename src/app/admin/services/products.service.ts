import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';

import { Product, UpdateProductDTO, UploadProductImage } from '../interfaces/product.interface';

import { TokenService } from 'src/app/auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;
  token: string | null = '';

  constructor( private http: HttpClient, private tokenService: TokenService ) {}

  getAllProducts() {
    this.token = localStorage.getItem('token')
    console.log( this.token );
    return this.http.get<Product[]>(`${ this.baseUrl }/products`, {
      headers: {
        Authorization: `Bearer ${ this.token }`
      }
    });
  }

  updateProduct(id: number, dto: UpdateProductDTO ) {
    return this.http.put<UpdateProductDTO>(`${this.baseUrl}/products/update-product/${id}`, dto )
  }

  updateProductImage(id: number, url: UploadProductImage ) {
    return this.http.put<UpdateProductDTO>(`${this.baseUrl}/products/update-photo/${id}`, url )
  }
}
