import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/web/interfaces/product.interface';

import { ProductsService } from 'src/app/web/services/products.service';
import { StoreService } from '../../services/store.service';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  products: Product[] = [];
  warehouseId = 0;
  page = 1;
  limit = 10;

  constructor( 
    private storeService: StoreService,
    private productService: ProductsService,
    private warehouseService: WarehouseService
  ) {
    this.myShoppingCart = this.storeService.getSoppingCart();
  }

  ngOnInit(): void {
    this.warehouseService.getWareHouse()
      .subscribe( ({ warehouseId }) => {
        this.warehouseId = warehouseId 
        this.initialCharge();
      });
  }

  initialCharge() {
    this.productService.getAllProducts( this.warehouseId, this.page, this.limit )
      .subscribe( products => {
        this.products = products;
      });
  }
  
  searchProduct( tag: string ) {
    if (tag === '') return;
    this.productService.getProductsBySearch( this.warehouseId, this.page, this.limit, tag )
      .subscribe( rta => {
        if ( rta ) {
          this.products = rta;
        }});
  }

  chargeProducts( page: number ) {
    this.productService.getAllProducts( this.warehouseId, page, this.limit )
    .subscribe( products => {
      if( products.length > 0 ) {
        console.log( products );
        this.products = products;
      } else {
        this.products = [];
      }
    });
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
  }
  
}