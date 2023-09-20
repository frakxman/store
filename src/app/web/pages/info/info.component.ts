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

  productId: string | null = null;
  product: Product | null = null;

  constructor( private router: ActivatedRoute, private productService: ProductsService ) {}

  ngOnInit(): void {
    this.router.paramMap
      .pipe(
        switchMap(( params ) => {
          this.productId = params.get('id');
          console.log( this.productId);
          if( this.productId ) {
            console.log( this.productId );
            let id = parseInt(this.productId)
            console.log( id );
            this.productService.getOneProduct( id );
          }
          return [null];
        })
      )
      .subscribe(data => {
        console.log(data);
        this.product = data;
        console.log( this.product );        
      });
  }

}
