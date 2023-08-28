import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Product } from '../interfaces/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products/4?page=1&limit=10`);
  }

  getOneProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/get-product/${id}/4`);
  }

  // createNewProduct () {}

  // uptdateProduct() {}

  // deleteProduct() {}
}
