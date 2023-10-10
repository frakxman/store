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

  url = '';
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

  selectImg( event: any ) {

    if( event.target.files.length > 0 ) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ( event: any ) => {
        this.default = event.target.result;
      }
    this.url = file.name;
    console.log( file );
    console.log( this.url );
    }
  }

  uploadImg() {
    const formData = new FormData();
    // formData.append('file', this.url );
    formData.append('file', this.default );
    console.log( this.default );
    console.log( this.url );
    console.log( formData );
    this.productService.updateProductImage( this.id, formData.toString() )
      .subscribe( rta => console.log( rta ));
  }

}
