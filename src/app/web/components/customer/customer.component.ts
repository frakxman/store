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

  // calcularDigitoVerificacion ( myNit )  {
  //   var vpri, x, y, z;
    
  //   // Se limpia el Nit
  //   myNit = myNit.replace ( /\s/g, "" ) ; // Espacios
  //   myNit = myNit.replace ( /,/g,  "" ) ; // Comas
  //   myNit = myNit.replace ( /\./g, "" ) ; // Puntos
  //   myNit = myNit.replace ( /-/g,  "" ) ; // Guiones
    
  //   // Se valida el nit
  //   if  ( isNaN ( myNit ) )  {
  //     console.log ("El nit/cédula '" + myNit + "' no es válido(a).");
  //     return "" ;
  //   };
    
  //   // Procedimiento
  //   vpri = new Array(16) ; 
  //   z = myNit.length ;
  
  //   vpri[1]  =  3 ;
  //   vpri[2]  =  7 ;
  //   vpri[3]  = 13 ; 
  //   vpri[4]  = 17 ;
  //   vpri[5]  = 19 ;
  //   vpri[6]  = 23 ;
  //   vpri[7]  = 29 ;
  //   vpri[8]  = 37 ;
  //   vpri[9]  = 41 ;
  //   vpri[10] = 43 ;
  //   vpri[11] = 47 ;  
  //   vpri[12] = 53 ;  
  //   vpri[13] = 59 ; 
  //   vpri[14] = 67 ; 
  //   vpri[15] = 71 ;
  
  //   x = 0 ;
  //   y = 0 ;
  //   for  ( var i = 0; i < z; i++ )  { 
  //     y = ( myNit.substr (i, 1 ) ) ;
  //     // console.log ( y + "x" + vpri[z-i] + ":" ) ;
  
  //     x += ( y * vpri [z-i] ) ;
  //     // console.log ( x ) ;    
  //   }
  
  //   y = x % 11 ;
  //   // console.log ( y ) ;
  
  //   return ( y > 1 ) ? 11 - y : y ;
  // }
  
  // // Calcular
  // calcular() {
  
  //   // Verificar que haya un numero
  //   let nit = document.getElementById("nit").value;
  //   let isNitValid = nit >>> 0 === parseFloat(nit) ? true : false; // Validate a positive integer
    
  //   // Si es un número se calcula el Dígito de Verificación
  //   if ( isNitValid ) {
  //     let inputDigVerificacion = document.getElementById("digitoVerificacion");
  //     inputDigVerificacion.value = calcularDigitoVerificacion (nit);
  //   }
  // }

}
