import { Component, Input, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { OrdersService } from '../../services/orders.service';
import { WarehouseService } from '../../services/warehouse.service';

import { Product } from '../../interfaces/product.interface';
import { ItradeOrderHeader, ItradeOrderDetail } from '../../interfaces/orders.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() 
  public idTercero: number = 0;

  products: Product[] = [];
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
  orderResp: any = {
    order: {
    numero: 0,
    subtotal: 0,
    valor_impuesto: 0,
    valor_total: 0,
    fecha: '',
    hora: '',
    nit: 0,
    nombres: '',
    apellidos: '',
    email: '',
    almacen: '',
    descuentos: 0
    },
    products: [
      {
        idproducto: 0,
        descripcion: '',
        valorprod: 0,
        descuento: 0,
        porcdesc: 0,
        cantidad: 0
      }
    ]
  };
  payUrl: any;
  wareHouseId = 1;
  number = 0;
  id = '';
  date = '';
  currentTime = '';

  constructor(
    private storeService: StoreService,
    private orderService: OrdersService,
    private wareHouseService: WarehouseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
    this.wareHouseService.getWareHouse().subscribe(({ warehouseId }) => this.wareHouseId = warehouseId );
  }

  getNumberOrder() {
    this.orderService.getOrderNumber( this.wareHouseId )
      .subscribe( rta => {
        const numberO = Object.values( rta );
        if( numberO[0] === 0 ){
          this.number = (numberO[0] + 1);
          this.order.numero = this.number;
        }
         else {
          this.number = (numberO[0] + 1);
          this.order.numero = this.number;
        }
        return this.number;
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
  }

  setOrderSubtotal() {
    const subTotal = this.products.reduce((total, product) => {
      return total + product.baseValue * product.store;
    }, 0);
    const subTotals = subTotal.toFixed(3);
    this.order.subtotal = parseFloat(subTotals);
  }

  setOrderIva() {
    const valivas = this.products.reduce((total, product) => {
      return total + product.taxValue * product.store;
    }, 0);
    const valiva = valivas.toFixed(3);
    this.order.valiva = parseFloat(valiva);
    this.order.valimpuesto = parseFloat(valiva);
  }

  setOrderTotal() {
    const totals = this.products.reduce((total, product) => {
      return total + product.precioventa * product.store;
    }, 0);
    this.order.valortotal = totals;
  }

  setOrder() {
    this.getNumberOrder();
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

  confirmOrder() {
    console.log( this.order.numero );
    console.log( this.wareHouseId );
    this.orderService.getConfirmOrder( this.order.numero, this.wareHouseId )
      .subscribe( resp => {
        console.log( resp );
        this.orderResp = resp;
        console.log( this.orderResp.products );
      });
  }

  generateOrder() {
    this.getDate();
    this.setDetPedidos();
    this.setOrder();
    this.setOrderSubtotal();
    this.setOrderIva();
    this.setOrderTotal();
    setTimeout(() => {
    this.orderService.generateOrder(this.order)
      .subscribe( rta => {
        const resp  = Object.entries( rta );
        this.id = resp[0][1].toString();
        for (const idprods of this.order.detpedidos) {
          idprods.idpedido = this.id;
        }
      });
      setTimeout(() => {
        this.confirmOrder();
      }, 0.500);
    }, 1000);
  }

  payOrder() {
    console.log(this.order.numero);
    console.log(this.wareHouseId);
    this.orderService.payOrder( this.order.numero, this.wareHouseId )
    .subscribe( resp => {
      console.log( resp );
      this.payUrl = resp;
      console.log( this.payUrl.init_point );
      window.open(`${ this.payUrl.init_point }`, '_blank');
      this.router.navigate(['/store/list']);
      // this.storeService.resetShoppingCart();
    });
  }

}
