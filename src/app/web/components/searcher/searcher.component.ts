import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';

import { Product } from '../../interfaces/product.interfaces';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {

  // TODO: Busqueda de productos y de productos por categoria, son dos @Outputs uno dirigido a Products

  private productService = inject( ProductsService );  

}
