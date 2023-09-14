import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';
import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  constructor( private storeService: StoreService ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
  }  

  // Saber cuantos productos son iguales o tengan el mismo identificador
  totalProductById() {
    let productId = this.products.map((productId) => productId.idproducto );
    console.log( productId );
  }

  // Saber cuanto es el valor total por producto
  totalCostbyProduct() {}

  // Adicionar un producto desde la tabla del carrito
  addUnitProduct() {}

  // Disminuir un producto desde la tabla del carrito
  restUnitProduct() {}

  // Saber cuanto es el valor total por todos los productos
  totalCostbyAllProducts() {}

}
