import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  page = 1;
  limit = 10;
  newProducts: Product[] = [];
  products: Product[] = [];

  constructor( private productService: ProductsService ) {}

  previousPage() {
    this.productService.getProductsByPage(this.page, this.limit)
      .subscribe( data => {
        if(this.newProducts.length === 0 ) {
          return;
        }
        this.newProducts = data;
        this. products = this.newProducts;
        this.page--;
      });
  }

  nextPage() {
    this.productService.getProductsByPage(this.page, this.limit)
      .subscribe( data => {
        console.log( data );
        this.newProducts = data;
        this. products = this.newProducts;
        this.page++;
      });
  }

}
