import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.interfaces';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  product: Product | null = null;

  constructor( private activatedRoute: ActivatedRoute, private productService: ProductsService ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productService.getOneProduct( parseInt( id )))
      )
      .subscribe(data  => this.product = data );
  }

}
