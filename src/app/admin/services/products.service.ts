import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { environments } from 'src/environments/environments';

import { Product, UpdateProductDTO, UploadProductImage } from '../interfaces/product.interface';

import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {

  private baseUrl: string = environments.baseUrl;
  token = '';
 
  constructor( private http: HttpClient, private authService: AuthService ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe( user => {
      console.log( user );
      this.token = user.access_token;
      console.log( this.token )
    });
}

  getAllProducts() {
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
