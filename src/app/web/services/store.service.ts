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

  addProduct( product: Product ) {
    if( this.myShoppingCart.length === 0 ) {
      product.store = 1;
      this.myShoppingCart.push( product );
      this.myCart.next(this.myShoppingCart);
    } else {
      const productMod = this.myShoppingCart.find(( item ) => {
        return item.idproducto === product.idproducto
      });
      if( productMod ) {
        productMod.store = productMod.store + 1;
        this.myCart.next( this.myShoppingCart );
      } else {
        product.store = 1;
        this.myShoppingCart.push( product );
        this.myCart.next( this.myShoppingCart );
      }
    }
  }

  getSoppingCart() {
    return this.myShoppingCart;
  }

  getTotalCart() {
    const total = this.myShoppingCart.reduce(( sum, item ) => {
      return sum + ( item.store * item.precioventa )}, 0);
    return total;
  }

  findProductById( id: number ) {
    return this.myShoppingCart.find(( item ) => {
      return item.idproducto === id;
    })
  }

  deleteProduct( id: number ) {
    this.myShoppingCart = this.myShoppingCart.filter(( product ) => {
      return product.idproducto !== id;
    });
    this.myCart.next( this.myShoppingCart );
  }
}
