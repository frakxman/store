import { Component, Input, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { OrdersService } from '../../services/orders.service';
import { WarehouseService } from '../../services/warehouse.service';


import { Product } from '../../interfaces/product.interface';
import { ItradeOrderHeader, ItradeOrderDetail } from '../../interfaces/orders.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() 
  public idTercero: number = 0;

  products: Product[] = [];
  // numberO = [];
  ordersNumber = {};
  order?: ItradeOrderHeader = {
    numero:         0,
    idtercero:      0,
    fecha:          '',
    idvendedor:     0,
    subtotal:       0,
    valortotal:     0,
    valimpuesto:    0,
    valdescuentos:  0,
    valretenciones: 0,
    valiva:         0,
    idalmacen:      0,
    estado:         0,
    detalle:        '',
    fechacrea:      '',
    hora:           '',
    idsoftware:     0,
    plazo:          0,
    detpedidos:     [],
  };
  detPedidos: ItradeOrderDetail = {
    idpedido:   '',
    idproducto: 0,
    cantidad:   0,
    valorprod:  0,
    descuento:  0,
    porcdesc:   0,
    codiva:     '',
    porciva:    0,
    costoprod:  0,
    despachado: 0,
    base:       0,
    ivaprod:    0,
  };
  wareHouseId = 1;
  date = '';
  currentTime = '';

  constructor(
    private storeService: StoreService,
    private orderService: OrdersService,
    private wareHouseService: WarehouseService 
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
    this.wareHouseService.getWareHouse().subscribe(({ warehouseId }) => this.wareHouseId = warehouseId );
  }

  getNumberOrder() {
    this.orderService.getOrderNumber( this.wareHouseId )
      .subscribe( rta => {
        // console.log( rta );
        this.ordersNumber = rta;
        // console.log(this.ordersNumber );
        const numberO = Object.entries(this.ordersNumber);
        // console.log(numberO);
        const number = numberO.length;
        // console.log(number);
        this.order!.numero = (number + 1);
        console.log(this.order!.numero);
      });
  }

  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let updatedMonth = month.toString();
    if (updatedMonth.length == 1) {
      updatedMonth = `0${updatedMonth}`;
    }
    let day = date.getDate().toString();
    if (day.length == 1) {
      day = `0${day}`;
    }
    this.date = `${year}${updatedMonth}${day}`;
    this.currentTime = `${hour}:${minutes}:${seconds}`;
  }

  setDetPedidos() {
    if( !this.products ) return;
    for (const product of this.products) {
      this.detPedidos.idproducto = product.idproducto;
      this.detPedidos.cantidad = product.store;
      this.detPedidos.valorprod = product.precioventa;
      this.detPedidos.descuento = 0;
      this.detPedidos.porcdesc = 0;
      this.detPedidos.codiva = product.codiva;
      this.detPedidos.porciva = product.porcentaje;
      this.detPedidos.costoprod = product.costo;
      this.detPedidos.despachado = 0;
      this.detPedidos.base = product.baseValue;
      this.detPedidos.ivaprod = product.taxValue;
    }
    console.log( this.detPedidos );
    console.log( this.order?.detpedidos );
  }

  setOrder() {
    this.order!.fecha = this.date;
  }

  generateOrder() {
    this.getNumberOrder();
    this.getDate();
    this.setDetPedidos();
    console.log( this.idTercero );
    console.log( this.date );
    console.log( this.currentTime );
    console.log( this.products );
  }

}
