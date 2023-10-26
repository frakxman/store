import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { Product } from '../../interfaces/product.interface';

import { ProductsService } from '../../services/products.service';
import { StoreService } from '../../services/store.service';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  myShoppingCart: Product[] = [];
  product: Product | null = null;
  warehouseId = 0;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private storeService: StoreService,
    private warehouseService: WarehouseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.warehouseService.getWareHouse()
      .subscribe( ({ warehouseId }) => {
        this.warehouseId = warehouseId;
        this.activatedRoute.params
          .pipe(
            switchMap(({ id }) => this.productService.getOneProduct( parseInt( id ), this.warehouseId ))
          )
          .subscribe(data  => this.product = data );
       });
  }

  goBack() {
    this.location.back();
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
  }

  // TODO: Create a method to verify the quantity available 
  
}
