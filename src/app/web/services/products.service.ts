import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environments } from 'src/environments/environments';

import { Product } from '../interfaces/product.interfaces';
import { WarehouseService } from './warehouse.service';
import { WareHouse } from '../interfaces/wareHouse';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environments.baseUrl;
  wareHouse: WareHouse = {
    warehouse: {
      idalmacen: 0,
      nomalmacen: '',
    },
    wareHouseId: 0,
  };
  wareHouseId = 0;

  constructor( 
    private http: HttpClient,
    private wareHouseService: WarehouseService
  ) {}

  getWareHouse() {
    this.wareHouseService.getWareHouse()
      .subscribe( data => {
        this.wareHouse = data;
        console.log(this.wareHouse);
      } );
  }

  getWareHouseId() {
    this.wareHouseId = this.wareHouse.wareHouseId;
    console.log(this.wareHouseId);
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
