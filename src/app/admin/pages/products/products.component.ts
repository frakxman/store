import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';

import { Product } from 'src/app/web/interfaces/product.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  page = 1;
  limit = 10;
  
  constructor( private productService: ProductsService ) {}

  ngOnInit(): void {
    this.productService.getAllProducts( this.page, this.limit )
    .subscribe( products => {
      this.products = products;
    });
  }

  chargeProducts( page: number ) {
    this.productService.getAllProducts( page, this.limit )
    .subscribe( products => {
      if( products.length > 0 ) {
        console.log( products );
        this.products = products;
      } else {
        this.products = [];
      }
    });
  }

}
