import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from '../../services/customer.service';

import { Country } from '../../interfaces/countries';
import { Departments } from '../../interfaces/departments';
import { Municipalities } from '../../interfaces/municipalities';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  private customerService = inject( CustomerService );
  private fb = inject( FormBuilder );

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

  ngOnInit(): void {
    this.customerService.getCountries().subscribe( countries => this.countries = countries );
    this.customerService.getDepartments().subscribe( departments => this.departments = departments );
    this.customerService.getMunicipalities().subscribe( municipalities => this.municipalities = municipalities );
  }

  createUser() {
    console.log(this.createUserForm.value);
    // this.customerService.createCustomer()
  }

}
