import { Component } from '@angular/core';

import { Categories } from '../../interfaces/categories.interfaces';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  public categories: Categories[] = [];
  
  constructor( private categoriesServices: CategoriesService, private productsService: ProductsService ) {}

  ngOnInit(): void {
      this.categoriesServices.getAllCategories()
        .subscribe( data => {
          this.categories = data;
        });
  }

  categorySelected( index: number ) {
    let categoriesNames = this.categories.map((category) => category.nombre );
    console.log(categoriesNames, index);
    for( let i = 0; i <= this.categories.length; i++ ) {
      if ( index === i ) {
        this.productsService.getByCategory()
      }
    }
  }

}
