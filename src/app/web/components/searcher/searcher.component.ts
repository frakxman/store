import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {

  // TODO: Busqueda de productos y de productos por categoria, son dos @Outputs uno dirigido a Products

  private productService = inject( ProductsService );

  searchProductByCategory( descripcion: string ) {
    this.productService.getByCategory()
  }

}
