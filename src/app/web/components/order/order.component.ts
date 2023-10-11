import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products: Product[] = [];
  idTercero = 0;

  constructor(  ) {}

  ngOnInit(): void {
  }

  // TODO: get the idTercero from customerComponentTS 
  // TODO: get the listProducts from cartComponentTs
  // TODO: get the diferent dates from cartComponentTs
  generateOrder() {
    console.log('Order generate');
  }

}
