import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

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

  purchase = false;

  constructor( private router: Router ) {}

  ngOnInit(): void {
      if( this.router.url.includes('store') ) {
        this.purchase = true;
      }
  }

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  sent() {
    // this.editProduct.emit(this.product);
    this.router.navigate([`admin/edit/${this.product.idproducto}`]);
  }

}
