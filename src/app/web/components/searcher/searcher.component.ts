import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';

import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {



  // TODO: Busqueda de productos y de productos por categoria, son dos @Outputs uno dirigido a Products
  products: Product[] = [];
  page = 1;
  limit = 10;


  private productService = inject( ProductsService );  

  searchTag( newTag: string ) {
    if ( newTag === '' ) return;
    
    let tag = newTag.trim().toLowerCase();
    this.productService.getProductsBySearch( this.page, this.limit, tag )
      .subscribe( rta => {
        this.products = rta;
        console.log( this.products );
      });
    return this.products;
  }

}
