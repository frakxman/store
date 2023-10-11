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
  form = false;

  constructor( private storeService: StoreService ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
  }  

  totalCostbyProduct( price: number, quantity: number) {
    return price * quantity;
  }

  updateUnitProduct(operation: string, id: number ) {
    const product = this.storeService.findProductById( id );
    if( product ) {
      if( operation === 'minus' && product.store > 0 ) {
        // product.store = product.store - 1;
        product.store -= 1;
      }
      if( operation === 'plus' ) {
        // product.store = product.store + 1;
        product.store += 1;
      }
      if( product.store === 0 ) {
        this.deleteProduct( id );
      }
    }
  }

  deleteProduct(id: number ) {
    this.storeService.deleteProduct(id);
  }

  getTotalPrice() {
    const total = this.storeService.getTotalCart();
    return total;
  }

  formRegister() {
    this.form = true;
  }

}
