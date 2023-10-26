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
  warehouseId = 0;
  page = 1;
  limit = 10;
  
  constructor( 
    private categoriesServices: CategoriesService,
    private productsService: ProductsService,
    private storeService: StoreService,
    private warehouseService: WarehouseService
  ) {
    this.myShoppingCart = this.storeService.getSoppingCart();
  }

  ngOnInit(): void {
    this.setWareHouseId();
    this.categoriesServices.getAllCategories( this.page, this.limit )
      .subscribe( data => {
        this.categories = data;
        console.log( this.categories );
      });
  }

  setWareHouseId() {
    this.warehouseService.getWareHouse()
      .subscribe( ({ warehouseId }) => this.warehouseId = warehouseId );
  }

  searchCategory( tag: string ) {
   let name = tag.trim();
   this.categorySelected( name );
  }

  categorySelected( name: string ) {
    console.log( name );
    this.productsService.getByCategory( this.warehouseId, name, this.page, this.limit, '' )
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
