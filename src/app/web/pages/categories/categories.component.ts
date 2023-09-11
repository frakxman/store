import { Component } from '@angular/core';

import { Categories } from '../../interfaces/categories.interfaces';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
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
  page = 1;
  limit = 10;
  
  constructor( 
    private categoriesServices: CategoriesService,
    private productsService: ProductsService,
    private storeService: StoreService,
  ) {
    this.myShoppingCart = this.storeService.getSoppingCart();
  }

  ngOnInit(): void {
      this.categoriesServices.getAllCategories( this.page, this.limit )
        .subscribe( data => {
          this.categories = data;
        });
  }

  categorySelected( index: number ) {
    let categoriesNames = this.categories.map((category) => category.nombre );
    for( let i = 0; i <= this.categories.length; i++ ) {
      if ( index === i ) {
        this.productsService.getByCategory( categoriesNames[i], this.page, this.limit, '' )
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
