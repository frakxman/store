import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Product } from '../interfaces/product.interfaces';
import { WarehouseService } from './warehouse.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;
  private wareHouseId: number = 0;

  constructor( 
    private http: HttpClient,
    private wareHouseService: WarehouseService
  ) {
    this.wareHouseService.getWareHouse()
      .subscribe(({ warehouseId }) => this.wareHouseId = warehouseId );
  }

  getByCategory( categoryName?: string, page?: number, limit?: number ) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${ this.wareHouseId }/${categoryName}`, { params });
  }

  getAllProducts(page?: number, limit?: number) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ this.wareHouseId }`, { params });
  }

  getProductsByPage( page: number, limit: number ) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${ this.wareHouseId }`, { params: { page, limit }});
  }

  getOneProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/get-product/${id}/${ this.wareHouseId }`);
  }
}
