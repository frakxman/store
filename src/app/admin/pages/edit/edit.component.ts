import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  private fb = inject( FormBuilder );

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

  editProduct() {
    console.log(this.editProductForm.value);
  }

}
