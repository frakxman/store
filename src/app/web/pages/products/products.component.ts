import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/web/interfaces/product.interfaces';
import { ProductsService } from 'src/app/web/services/products.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  products: Product[] = [];
  page = 1;
  limit = 10;

  constructor( 
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getSoppingCart();
  }

  ngOnInit(): void {
      this.productService.getAllProducts( this.page, this.limit )
        .subscribe( products => this.products = products );
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
  }
}
