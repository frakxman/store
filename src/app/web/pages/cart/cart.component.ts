import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';
import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  productById: number[] = [];
  accumProduct = 0;

  constructor( private storeService: StoreService ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
  }  

  getQuantityOfProduct() {
    if( this.products.length > 0 ) {
      for (let i = 0; i < this.products.length; i++) {
        this.productById.push( this.products[i].idproducto )
      }
    }
    console.log( this.productById );
  }
}
