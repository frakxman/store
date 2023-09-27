import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/web/interfaces/product.interfaces';

import { ProductsService } from 'src/app/web/services/products.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  
  constructor( private productService: ProductsService ) {}

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe( products => {
      this.products = products;
      console.log(this.products);
    });
  }

}
