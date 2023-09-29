import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/web/interfaces/product.interfaces';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';


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
}
