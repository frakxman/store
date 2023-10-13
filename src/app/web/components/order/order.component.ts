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
  ordersNumber = {};
  number = 0;
  order: ItradeOrderHeader = {
    numero:         0,
    idtercero:      0,
    fecha:          '',
    idvendedor:     0,
    subtotal:       0,
    valortotal:     0, //suma total del valor total de todos los prods
    valimpuesto:    0, // suma del total del iva por todos los productos
    valdescuentos:  0,
    valretenciones: 0,
    valiva:         0, // igual al valimpuesto
    idalmacen:      0,
    estado:         0,
    detalle:        '', //Message X
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
    console.log( this.wareHouseId )
    this.orderService.getOrderNumber( this.wareHouseId )
      .subscribe( rta => {
        console.log( rta );
        const numberO = Object.entries( rta );
        console.log(numberO);
        if( numberO.length === 0 ){
          this.number = (numberO.length + 1);
          console.log(this.number);
          this.order.numero = this.number;
          console.log(this.order.numero);
        } else {
          this.ordersNumber = rta;
          console.log(this.ordersNumber );
          const numberO = Object.entries(this.ordersNumber);
          console.log(numberO);
          const number = numberO.length;
          console.log(number);
          this.order!.numero = (number + 1);
          console.log(this.order!.numero);
        }
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
    this.products.forEach( product => {
      this.detPedidos = {
        idpedido: '',
        idproducto: product.idproducto,
        cantidad: product.store,
        valorprod: product.precioventa,
        descuento: 0,
        porcdesc: 0,
        codiva: product.codiva,
        porciva: product.porcentaje,
        costoprod: product.costo,
        despachado: 0,
        base: product.baseValue,
        ivaprod: product.taxValue,
      }
      this.order!.detpedidos.push(this.detPedidos);
    });    
    console.log( this.order.detpedidos );
  }

  setOrderSubtotal() {
    const subTotals = this.products.reduce((total, product) => {
      return total + product.baseValue * product.store;
    }, 0);
    console.log('subTotals', subTotals);
    this.order.subtotal = subTotals;
  }

  setOrderIva() {
    const valiva = this.products.reduce((total, product) => {
      return total + product.taxValue * product.store;
    }, 0);
    console.log('Iva', valiva);
    this.order.valiva = valiva;
    console.log('Iva', this.order.valiva);
    this.order.valimpuesto = valiva;
    console.log('Iva', this.order.valimpuesto);
  }

  setOrderTotal() {
    const totals = this.products.reduce((total, product) => {
      return total + product.precioventa * product.store;
    }, 0);
    console.log('Totals', totals);
    this.order.valortotal = totals;
  }

  setOrder() {
    this.order.idtercero = this.idTercero;
    this.order.fecha = this.date;
    this.order.idvendedor =     1;
    this.order.valdescuentos =  0;
    this.order.valretenciones = 0;
    this.order.idalmacen =      this.wareHouseId;
    this.order.estado =         3;
    this.order.detalle! =      'Message X';
    this.order.fechacrea =     this.date;
    this.order.hora =          this.currentTime;
    this.order.idsoftware =     3;
    this.order.plazo =          0;
  }

  generatePreOrder() {
    this.getNumberOrder();
    this.getDate();
    this.setDetPedidos();
    this.setOrder();
    this.setOrderSubtotal();
    this.setOrderIva();
    this.setOrderTotal();
  }

  generateOrder() {
    this.generatePreOrder();
    console.log(this.order);
    setTimeout(() => {
      this.orderService.generateOrder(this.order)
        .subscribe( rta => console.log( rta ));      
    }, 1000);
  }

}
