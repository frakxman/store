import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { ProductsService } from '../../services/products.service';

import { Product } from '../../interfaces/product.interfaces';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  myShoppingCart: Product[] = [];
  product: Product | null = null;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private storeService: StoreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productService.getOneProduct( parseInt( id )))
      )
      .subscribe(data  => this.product = data );
  }

  goBack() {
    this.location.back();
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
  }
  
}
