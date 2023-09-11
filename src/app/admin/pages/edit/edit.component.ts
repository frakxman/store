import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  private fb = inject( FormBuilder );

  public editProductForm: FormGroup = this.fb.group({
    barcode: ['',[]],
    descripcion: ['',[]],
    Description_Store: ['',[]],
    precioventa: ['',[]],
    precioespecial1: ['',[]],
    precioespecial2: ['',[]],
    costo: ['',[]],
    ultcosto: ['',[]]
  });

  editProduct() {
    console.log(this.editProductForm.value);
  }

}
