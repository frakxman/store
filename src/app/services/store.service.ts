import { Injectable } from '@angular/core';

import { Product } from '../interfaces/product.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct( product: Product ){
    this.myShoppingCart.push( product );
    this.myCart.next(this.myShoppingCart);
  }

  getSoppingCart() {
    return this.myShoppingCart;
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.precioventa, 0);
  }
}
