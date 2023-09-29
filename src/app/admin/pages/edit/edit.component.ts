import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { ProductsService } from '../../services/products.service';

import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private fb = inject( FormBuilder );
  products: Product[] = [];
  productEdit: Product = {
    idproducto: 0,
    costo: 0,
    ultcosto: 0,
    codiva: '',
    precioventa: 0,
    descripcion: '',
    barcode: '',
    codigo: '',
    cantidad: 0,
    nomalmacen: '',
    Description_Store: '',
    porcentaje: 0,
    product_photo: [''],
    baseValue: 0,
    taxValue: 0,
    store: 0,
  };

  public editProductForm: FormGroup = this.fb.group({
    barcode: ['',[ Validators.required ]],
    descripcion: ['',[ Validators.required ]],
    Description_Store: ['',[ Validators.required ]],
    precioventa: ['',[ Validators.required ]],
    precioespecial1: ['',[ Validators.required ]],
    precioespecial2: ['',[ Validators.required ]],
    costo: ['',[ Validators.required ]],
    ultcosto: ['',[ Validators.required ]]
  });

  constructor( private productService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router ) {}

  ngOnInit() { 
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.productService.getOneProduct( id )),
      )
      .subscribe( product => {
        console.log( product );
        this.productEdit = product;
        console.log( this.productEdit );
        this.editProductForm.patchValue({ product });

        // this.editProductForm.reset( this.productEdit );

        // this.editProductForm.reset({
        //   barcode: product.barcode,
        //   descripcion: product.descripcion,
        //   Description_Store: product.Description_Store,
        //   precioventa: product.precioventa,
        //   costo: product.costo,
        //   ultcosto: product.ultcosto
        //  });

        // this.editProductForm.setValue({
        //   barcode: product.barcode,
        //   descripcion: product.descripcion,
        //   Description_Store: product.Description_Store,
        //   precioventa: product.precioventa,
        //   costo: product.costo,
        //   ultcosto: product.ultcosto
        // });
        console.log( this.editProductForm.value );
      })
  }

  editProduct() {
    // this.productService.editProduct();
    console.log( this.editProductForm.value );
  }

  imgForm() {
      this.router.navigate([`admin/img/${this.productEdit.idproducto}`]);
  }

}
