import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interfaces';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private fb = inject( FormBuilder );
  products: Product[] = [];

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

  constructor( private storeService: StoreService ) {}

  ngOnInit(): void {
    this.storeService.myCart$
      .subscribe( products => {
        this.products = products
      });
  }

  createUser() {
    console.log(this.createUserForm.value);
  }

  getQuantityOfProducts() {
    console.log(this.products);
  }

}
