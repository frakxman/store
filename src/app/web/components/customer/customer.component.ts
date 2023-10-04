import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from '../../services/customer.service';

import { Country } from '../../interfaces/countries';
import { Departments } from '../../interfaces/departments';
import { Municipalities } from '../../interfaces/municipalities';
import { CustomerResp, Nit, updateCustomerDto } from '../../interfaces/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  private customerService = inject( CustomerService );
  private fb = inject( FormBuilder );

  customer: CustomerResp = {
    nit: '',
    digito: 0,
    TipoId: '',
    nombres: '',
    nombre2: '',
    apellidos: '',
    apellido2: '',
    direccion:'',
    telefono: '',
    email: '',
    email2: '',
    idpais: 0,
    iddepto: 0,
    idmunicipio: 0,
    tipofactura: 0
  };
  tipoId = [
    {
        "Documento": "Registro Civil",
        "TipoId": "11"
    },
    {
        "Documento": "Tarjeta de Identidad",
        "TipoId": "12"
    },
    {
        "Documento": "Cédula de Ciudadanía",
        "TipoId": "13"
    },
    {
        "Documento": "Tarjeta de Extranjería",
        "TipoId": "21"
    },
    {
        "Documento": "Cédula de Extranjería",
        "TipoId": "22"
    },
    {
        "Documento": "N.I.T",
        "TipoId": "31"
    },
    {
        "Documento": "Pasaporte",
        "TipoId": "41"
    },
    {
        "Documento": "Documento de Identificación Extranjero",
        "TipoId": "42"
    },
    {
        "Documento": "N.I.T. de Otro País",
        "TipoId": "50"
    },
    {
        "Documento": "N.U.I.P.",
        "TipoId": "91"
    }
  ]
  countries: Country[] = [];
  departments: Departments[] = [];
  municipalities: Municipalities[] = [];
  id: Nit = {
    nit: ''
  };
  nitFound: boolean = false;
  myNit = parseInt(this.id.nit);  

  public createCustomerForm: FormGroup = this.fb.group({
    nit: ['', [ Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]],
    digito: ['', [ Validators.required]],
    TipoId: ['', [ Validators.required ]],
    nombres: ['', [ Validators.required, Validators.minLength(3) ]],
    nombre2: [''],
    apellidos: [''],
    apellido2: [''],
    direccion: ['', []],
    telefono: ['', [ Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    email: ['', [ Validators.required, Validators.email ]],
    email2: [''],
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

  isValidForm(field: string): boolean | null {
    return this.createCustomerForm.controls[field].errors && this.createCustomerForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if ( !this.createCustomerForm.controls[field] ) return null ;

    const errors = this.createCustomerForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres.`;
      }
    }

    return null;
  }

  ////////// Create Customer \\\\\\\\\\
  newCustomer() {
    this.nitFound = true ;
  }

  createCustomer() {
    // const dto = this.createCustomerForm.value;
    this.createCustomerForm.patchValue({ nit: parseInt(this.id.nit) });
    // this.customerService.createCustomer( dto );
    console.log(this.createCustomerForm.value);
  }

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
  
    // Si es un número se calcula el Dígito de Verificación
    if (isNitValid) {
      const digitoVerificacion = this.calcularDigitoVerificacion(nit.toString());
      this.createCustomerForm.patchValue({ digito: digitoVerificacion });
    }
  }


  ////////// Update Customer \\\\\\\\\\
  alreadyCustomer() {
    this.nitFound = true;
  }

  searchCustomer() {
    this.customerService.searchCustomer( this.id ) 
      .subscribe( rta => {
        console.log( rta );
        this.customer = rta;
        this.setValues();
      });
  }

  setValues( ) {
    // Set the value of digito like as response from API 
    this.createCustomerForm.patchValue({ digito: this.customer.digito });
    // Set the value of tipoID like as response from API
    for (const id of this.tipoId) {
      if ( this.customer.TipoId === id.TipoId ) {
        this.createCustomerForm.patchValue({ TipoId: this.customer.TipoId });
      }
    }
    // Set the value of nombres like as response from API
    this.createCustomerForm.patchValue({ nombres: this.customer.nombres });
    // Set the value of nombre2 like as response from API
    this.createCustomerForm.patchValue({ nombre2: this.customer.nombre2 });
    // Set the value of apellidos like as response from API
    this.createCustomerForm.patchValue({ apellidos: this.customer.apellidos });
    // Set the value of apellido2 like as response from API
    this.createCustomerForm.patchValue({ apellido2: this.customer.apellido2 });
    // Set the value of direccion like as response from API
    this.createCustomerForm.patchValue({ direccion: this.customer.direccion });
    // Set the value of telefono like as response from API
    this.createCustomerForm.patchValue({ telefono: this.customer.telefono });
    // Set the value of email like as response from API
    this.createCustomerForm.patchValue({ email: this.customer.email });
    // Set the value of email2 like as response from API
    this.createCustomerForm.patchValue({ email2: this.customer.email2 });
    // Set the value of pais like as response from API  
    for (const country of this.countries) {
      if ( this.customer.idpais === country.idpais ) {
        // this.createCustomerForm.patchValue({ idpais: country.nompais });
        this.createCustomerForm.patchValue({ idpais: this.customer.idpais });
      }
    }
    // Set the value of departamento like as response from API  
    for (const deparment of this.departments) {
      if ( this.customer.iddepto === deparment.iddepto ) {
        this.createCustomerForm.patchValue({ iddepto: this.customer.iddepto });
      }
    }
    // Set the value of municipio like as response from API  
    for (const municipio of this.municipalities) {
      if ( this.customer.idmunicipio === municipio.idmunicipio ) {
        this.createCustomerForm.patchValue({ idmunicipio: this.customer.idmunicipio });
      }
    }
     // Set the value of email2 like as response from API
     this.createCustomerForm.patchValue({ tipofactura: this.customer.tipofactura });
  }

  updateCustomer() {
    // const cusId = parseInt(this.id.nit)
    // const dto = this.createCustomerForm.value;
    // this.customerService.updateCustomer( cusId, dto );
    console.log(this.createCustomerForm.value);
  }

 

}
