import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interfaces';
import { StoreService } from '../../services/store.service';
import { CustomerService } from '../../services/customer.service';
import { Country } from '../../interfaces/countries';
import { Departments } from '../../interfaces/departments';
import { Municipalities } from '../../interfaces/municipalities';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private fb = inject( FormBuilder );
  products: Product[] = [];
  countries: Country[] = [];
  departments: Departments[] = [];
  municipalities: Municipalities[] = [];

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

  constructor( private storeService: StoreService, private customerService: CustomerService ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => this.products = products );
    this.customerService.getCountries().subscribe( countries => this.countries = countries );
    this.customerService.getDepartments().subscribe( departments => this.departments = departments );
    this.customerService.getMunicipalities().subscribe( municipalities => this.municipalities = municipalities );
  }

  createUser() {
    console.log(this.createUserForm.value);
  }

  getQuantityOfProducts() {
    console.log(this.products);
  }

  getDepartments() {
    this.customerService.getDepartments()
      .subscribe( rta => console.log( rta ));
  }

  getMunicipalities() {
    
  }

}
