import { Component } from '@angular/core';

import { Categories } from '../../interfaces/categories.interfaces';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interfaces';
import { StoreService } from '../../services/store.service';
import { WarehouseService } from '../../services/warehouse.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  
  myShoppingCart: Product[] = [];
  categories: Categories[] = [];
  products: Product[] = [];
  
  constructor( 
    private categoriesServices: CategoriesService,
    private productsService: ProductsService,
    private storeService: StoreService,
    private wareHouseService: WarehouseService
  ) {
    this.myShoppingCart = this.storeService.getSoppingCart();
  }

  ngOnInit(): void {
      this.categoriesServices.getAllCategories()
        .subscribe( data => {
          this.categories = data;
        });
  }

  categorySelected( index: number ) {
    let categoriesNames = this.categories.map((category) => category.nombre );
    for( let i = 0; i <= this.categories.length; i++ ) {
      if ( index === i ) {
        this.productsService.getByCategory( categoriesNames[i], 1, 10 )
          .subscribe( products => this.products = products );
      }
    }
    return this.products;
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    // this.total = this.storeService.getTotal();
  }
}
