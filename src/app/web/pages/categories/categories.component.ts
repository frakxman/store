import { Component } from '@angular/core';

import { Categories } from '../../interfaces/categories.interface';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
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
          console.log( data );
          this.categories = data;
          console.log( this.categories );
        });
  }

  searchCategory( tag: string ) {
   let name = tag.trim();
   this.categorySelected( name );
  }

  categorySelected( name: string ) {
    console.log( name );
    this.productsService.getByCategory( name, this.page, this.limit, '' )
      .subscribe( resp => {
        // TODO: Fix problem to get products of last n categories 
        console.log( resp );
        this.products = resp;
        console.log( this.products );
      });
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
  }
}
