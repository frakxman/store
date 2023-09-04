import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ProductsService } from '../../services/products.service';

import { Product } from '../../interfaces/product.interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  products: Product[] = [];
  categoryName?: string | null = null;
  page = 1;
  limit= 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
      this.activatedRoute.paramMap
        .subscribe( params => {
          this.categoryName = params.get('name');
          if ( this.categoryName ) {
            this.productService.getByCategory(this.categoryName, this.page, this.limit)
              .subscribe( data => {
                console.log(data);
                this.products = data;
              });
            }
        });
  }

  get productsByCategory() {
    
      return this.products;
  }

}
