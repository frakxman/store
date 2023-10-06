import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { UploadProductImage } from '../../interfaces/product.interface';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  url?: UploadProductImage;
  id: number = 0;
  default =  'assets/png/logo_celulares.png';

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute 
  ) {}

  public uploadImgForm: FormGroup = this.fb.group({
    url: ['', Validators.required ],
  });

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.id = id ),
    )
    .subscribe( rta => {
      console.log(this.id);
      console.log( rta );
    } );
  }

  uploadImg( id: number ) {
    const { url } = this.uploadImgForm.value;
    console.log( this.id );
    console.log( url );
    this.productService.updateProductImage(this.id, url )
      .subscribe( rta => console.log( rta ));
    this.uploadImgForm.reset();
  }

}
