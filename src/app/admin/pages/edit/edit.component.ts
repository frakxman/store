import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { ProductsService } from '../../services/products.service';

import { Product, UpdateProductDTO } from '../../interfaces/product.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private fb = inject( FormBuilder );
  productEdit: UpdateProductDTO = {
    Description_Store: '',
    barcode: '',
    codigo: '',
    codiva: '',
    costo: 0,
    descripcion: '',
    idproducto: 0,
    precioespecial1: 0,
    precioespecial2: 0,
    precioventa: 0,
    ultcosto: 0
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

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() { 
    return this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.productService.getOneProduct( id )),
      )
      .subscribe( product => {
        console.log( product );
        this.productEdit = product;
        this.editProductForm.patchValue( product );
        return;
      })
  }

  editProduct() {
    console.log(this.editProductForm.value);
    this.productService.editProduct(this.productEdit.idproducto, this.editProductForm.value);
    console.log('Update maked');
  }

  imgForm() {
    this.router.navigate([`admin/img/${this.productEdit.idproducto}`]);
  }

}
