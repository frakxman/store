import { Component } from '@angular/core';

import { Categories } from '../../interfaces/categories.interfaces';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interfaces';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  public categories: Categories[] = [];
  public products: Product[] = [];
  
  constructor( 
    private categoriesServices: CategoriesService,
    private productsService: ProductsService,
    private router: Router
  ) {}

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
          .subscribe( data => this.products = data );
          console.log( this.products );
        // this.router.navigate(['/store/category']);
      }
    }
    return this.products;
  }

}
