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
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    idproducto: 0,
    costo: 0,
    ultcosto: 0,
    codiva: '',
    precioventa: 0,
    descripcion: '',
    barcode: '',
    codigo: '',
    Urls_Img: '',
    cantidad: 0,
    nomalmacen: '',
    Description_Store: ''
  };
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
        .subscribe( products => this.products = products );
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    // this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail( id: number ) {
    // let images: string[] = [];
    this.productService.getOneProduct(id)
      .subscribe( data => {
        console.log( data );
        this.toggleProductDetail();
        this.productChosen = data;
        // images = this.productChosen.Urls_Img.split(',');
        // console.log( images[1] );
        console.log(this.productChosen);
      });
  }
}
