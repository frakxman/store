import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  private fb = inject( FormBuilder );

  public createUserForm: FormGroup = this.fb.group({
    nit: ['', [ Validators.required ]],
    digit: ['', [ Validators.required]],
    document: ['', [ Validators.required ]],
    firstName: ['', [ Validators.required, Validators.minLength(3) ]],
    secondName: [''],
    firstLastName: ['', [ Validators.minLength(3) ]],
    secondLastName: ['', [ Validators.minLength(3) ]],
    address: ['', []],
    phone: ['', [ Validators.required, Validators.min(10) ]],
    email: ['', [ Validators.required, Validators.email ]],
    verificationEmail: ['', [ Validators.email ]],
    confEmail: ['', [ Validators.email ]],
    country: [''],
    department: [''],
    town: [''],
    bill: ['', [ Validators.required ]]
  });

  createUser() {
    console.log(this.createUserForm.value);
  }

}
