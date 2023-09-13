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

  constructor( private storeService: StoreService ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
  }  

  getQuantityOfProducts() {
    console.log(this.products);
  }
}
