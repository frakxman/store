import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  constructor( private customerService: CustomerService ) {}

  // TODO: get the idTercero from customerComponentTS 
  // TODO: get the listProducts from cartComponentTs
  // TODO: get the diferent dates from cartComponentTs
}
