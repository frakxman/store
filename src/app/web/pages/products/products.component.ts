import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/web/interfaces/product.interfaces';
import { ProductsService } from 'src/app/web/services/products.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  products: Product[] = [];
  productsRender: Product[] = [];
  prods: any[] = [];
  photos: string[] = [];
  urlArray: string[] = [];
  page = 1;
  limit = 10;

  constructor( 
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getSoppingCart();
  }

  ngOnInit(): void {
    this.productService.getAllProducts( this.page, this.limit )
      .subscribe( products => {
        this.productsRender = products;
        console.log(this.productsRender);
      });
    this.transformProdcut();
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
  }

  transformProdcut() {
    setTimeout(() => {
      this.prods = this.productsRender.map(( url ) => url.product_photo );
      console.log( this.prods );
      for (let i = 0; i < this.prods.length; i++) {
        const stringArray = this.prods[i];
        for (let j = 0; j < stringArray.length; j++) {
          // console.log(`[${i}][${j}] ${stringArray[j]}`);
          this.photos.push(`data:image/png;base64,${stringArray[j].replace(
            '+',
            '%2B',
          ).replace('/', '%2F').replace('=', '%3D')}`)
        }
      }
      // for (const stringArray of this.prods) {
      //   for (const string of stringArray) {
      //    this.photos.push(`data:image/png;base64,${string.replace(
      //     '+',
      //     '%2B',
      //   ).replace('/', '%2F').replace('=', '%3D')}`)
      //   }
      // }
      console.log(this.photos);
    }, 1000);
    // console.log(this.urlArray )
    // this.products.product_photo = this.urlArray;
    // return this.urlArray;
  }
}

/*
// From Bard 
function transformArrayToUrl(base64Array: string[]): string[] {
  const urlArray = [];
  for (const base64String of base64Array) {
    urlArray.push(`data:image/png;base64,${base64String.replace(
      '+',
      '%2B',
    ).replace('/', '%2F').replace('=', '%3D')}`);
  }
  return urlArray;
}
*/