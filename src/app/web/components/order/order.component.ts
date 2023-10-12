import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() 
  public idTercero: number = 0;

  products: Product[] = [];

  constructor( private storeService: StoreService ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
  }

  // TODO: get the idTercero from customerComponentTS 
  // TODO: get the listProducts from cartComponentTs
  // TODO: get the diferent dates from new Date
  generateOrder() {
    console.log( this.idTercero );
    console.log( this.products );
  }

}
