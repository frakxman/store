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
    cantidad: 0,
    nomalmacen: '',
    Description_Store: '',
    porcentaje: 0,
    baseValue: 0,
    taxValue: 0,
    store: 0,
    product_photo: ['']
  }
  
  @Output() addedProduct = new EventEmitter<Product>();

  photos: string[] = [];

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  transformProdcut() {
    for (const photos of this.product.product_photo) {
      this.photos.push(photos);
    }
    console.log(this.photos);
    // this.photos.forEach(( photos ) => {
    //   photos = photos;
    //   photos.src = 'data:image/png;base64,'+this.photos
    // })
  }

}
