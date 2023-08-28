import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/interfaces/product.interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

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
    url_foto: '',
    cantidad: 0,
    nomalmacen: '',
  };

  constructor( private storeService: StoreService, private productService: ProductsService ) {
    this.myShoppingCart = this.storeService.getSoppingCart();
  }

  ngOnInit(): void {
      this.productService.getAllProducts()
        .subscribe( products => this.products = products );
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail( id: number ) {
    this.productService.getOneProduct(id)
      .subscribe( data => {
        this.toggleProductDetail();
        this.productChosen = data;
      });
  }
}
