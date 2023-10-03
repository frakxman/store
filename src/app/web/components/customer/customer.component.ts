import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from '../../services/customer.service';

import { Country } from '../../interfaces/countries';
import { Departments } from '../../interfaces/departments';
import { Municipalities } from '../../interfaces/municipalities';
import { Nit } from '../../interfaces/customer';

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
  id: Nit = {
    nit: ''
  };
  nitFound: boolean = false;
  myNit = parseInt(this.id.nit);

  public createCustomerForm: FormGroup = this.fb.group({
    nit: ['', [ Validators.required ]],
    digito: ['', [ Validators.required]],
    TipoId: ['', [ Validators.required ]],
    nombres: ['', [ Validators.required, Validators.minLength(3) ]],
    nombre2: [''],
    apellidos: ['', [ Validators.minLength(3) ]],
    apellido2: ['', [ Validators.minLength(3) ]],
    direccion: ['', []],
    telefono: ['', [ Validators.required, Validators.min(10) ]],
    email: ['', [ Validators.required, Validators.email ]],
    email2: ['', [ Validators.email ]],
    idpais: [''],
    iddepto: [''],
    idmunicipio: [''],
    tipofactura: ['', [ Validators.required ]]
  });

  ngOnInit(): void {
    this.customerService.getCountries().subscribe( countries => this.countries = countries );
    this.customerService.getDepartments().subscribe( departments => this.departments = departments );
    this.customerService.getMunicipalities().subscribe( municipalities => this.municipalities = municipalities );
  }

  searchCustomer() {
    this.customerService.searchCustomer( this.id ) 
      .subscribe( rta => {
        console.log( rta );
      });
  }

  createCustomer() {
    console.log(this.createCustomerForm.value);
  }

  updateCustomer() {}

  calcularDigitoVerificacion(nit: string) {
    // Se limpia el Nit
    nit = nit.replace(/\s/g, ""); // Espacios
    nit = nit.replace(/,/g, ""); // Comas
    nit = nit.replace(/\./g, ""); // Puntos
    nit = nit.replace(/-/g, ""); // Guiones
  
    // Se valida el nit
    if (isNaN(parseInt(nit))) {
      console.log("El nit/cédula '" + nit + "' no es válido(a).");
      return "";
    }
  
    // Procedimiento
    const vpri = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    const z = nit.length;
  
    let x = 0;
    let y = 0;
    for (let i = 0; i < z; i++) {
      y = parseInt(nit.substr(i, 1));
      x += y * vpri[z - i - 1];
    }
  
    y = x % 11;
  
    return (y > 1) ? 11 - y : y;
  }

  calcular() {

    // Verificar que haya un número
    const nit = parseInt(this.id.nit);
    const isNitValid = isFinite(nit) && nit > 0;
    console.log(nit);
  
    // Si es un número se calcula el Dígito de Verificación
    if (isNitValid) {
      const digitoVerificacion = this.calcularDigitoVerificacion(nit.toString());
      console.log(nit.toString());
      console.log(digitoVerificacion);
      this.createCustomerForm.patchValue({ digito: digitoVerificacion });
    }
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
  //     console.log ( y + "x" + vpri[z-i] + ":" ) ;
  
  //     x += ( y * vpri [z-i] ) ;
  //     console.log ( x ) ;    
  //   }
  
  //   y = x % 11 ;
  //   console.log ( y ) ;
  
  //   return ( y > 1 ) ? 11 - y : y ;
  // }
  
  // Calcular
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
