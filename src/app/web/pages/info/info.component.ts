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

  productId?: string | null;
  product?: Product | null;

  constructor( private router: ActivatedRoute, private productService: ProductsService ) {}

  ngOnInit(): void {
    this.router.paramMap
      .pipe(
        switchMap(( params ) => {
          this.productId = params.get('id');
          if( this.productId ) {
            this.productService.getOneProduct(parseInt(this.productId));
          }
          return [null];
        })
      )
      .subscribe(( data => this.product = data ));
  }

}
