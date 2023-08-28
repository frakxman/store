import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../interfaces/product.interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
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
  }
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<number>();

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  onShowDetail() {
    this.showProduct.emit(this.product.idproducto);
  }

}
