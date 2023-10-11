import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';

import { CustomerService } from '../../services/customer.service';

import { Country } from '../../interfaces/countries';
import { Departments } from '../../interfaces/departments';
import { Municipalities } from '../../interfaces/municipalities';
import { CustomerResp, Nit, CustomerDto } from '../../interfaces/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  private customerService = inject( CustomerService );
  private fb = inject( FormBuilder );

  customer: CustomerResp = {
    idtercero: 0,
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
  id: Nit = { nit: '' };
  nitFound = false;
  crear = false;
  myNit = this.id.nit; 

  public customerForm: FormGroup = this.fb.group({
    nit: [''],
    digito: ['', [ Validators.required]],
    TipoId: ['', [ Validators.required ]],
    nombres: ['', [ Validators.required, Validators.minLength(3) ]],
    nombre2: [''],
    apellidos: [''],
    apellido2: [''],
    direccion: ['', Validators.required ],
    telefono: ['', [ Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    email: ['', [ Validators.required, Validators.email ]],
    email2: [''],
    idpais: ['', Validators.required ],
    iddepto: ['', Validators.required ],
    idmunicipio: ['', Validators.required ],
    tipofactura: [, Validators.required ]
  });

  ngOnInit(): void {
    this.customerService.getCountries().subscribe( countries => this.countries = countries );
    this.customerService.getDepartments().subscribe( departments => this.departments = departments );
    this.customerService.getMunicipalities().subscribe( municipalities => this.municipalities = municipalities );
  }

  back() {
    this.nitFound = !this.nitFound;
  }

  ////////// Update Customer \\\\\\\\\\

  searchCustomer() {
    this.customerService.searchCustomer( this.id ) 
      .subscribe( rta => {
        if ( rta.idtercero ) {
          console.log( rta );
          this.customer = rta;
          this.nitFound = true;
          console.log('Ya registrado');
          this.setEditValues();
        } else {
          console.log('Por registrarse');
          this.nitFound = true;
          this.crear = true;
          this.calcular();
        }
      });
  }

  setEditValues( ) {
    // Set the value of digito like as response from API 
    this.customerForm.patchValue({ digito: this.customer.digito });
    // Set the value of tipoID like as response from API
    for (const id of this.tipoId) {
      if ( this.customer.TipoId === id.TipoId ) {
        this.customerForm.patchValue({ TipoId: this.customer.TipoId });
      }
    }
    // Set the value of nombres like as response from API
    this.customerForm.patchValue({ nombres: this.customer.nombres });
    // Set the value of nombre2 like as response from API
    this.customerForm.patchValue({ nombre2: this.customer.nombre2 });
    // Set the value of apellidos like as response from API
    this.customerForm.patchValue({ apellidos: this.customer.apellidos });
    // Set the value of apellido2 like as response from API
    this.customerForm.patchValue({ apellido2: this.customer.apellido2 });
    // Set the value of direccion like as response from API
    this.customerForm.patchValue({ direccion: this.customer.direccion });
    // Set the value of telefono like as response from API
    this.customerForm.patchValue({ telefono: this.customer.telefono });
    // Set the value of email like as response from API
    this.customerForm.patchValue({ email: this.customer.email });
    // Set the value of email2 like as response from API
    this.customerForm.patchValue({ email2: this.customer.email2 });
    // Set the value of pais like as response from API  
    for (const country of this.countries) {
      if ( this.customer.idpais === country.idpais ) {
        // this.createCustomerForm.patchValue({ idpais: country.nompais });
        this.customerForm.patchValue({ idpais: this.customer.idpais });
      }
    }
    // Set the value of departamento like as response from API  
    for (const deparment of this.departments) {
      if ( this.customer.iddepto === deparment.iddepto ) {
        this.customerForm.patchValue({ iddepto: this.customer.iddepto });
      }
    }
    // Set the value of municipio like as response from API  
    for (const municipio of this.municipalities) {
      if ( this.customer.idmunicipio === municipio.idmunicipio ) {
        this.customerForm.patchValue({ idmunicipio: this.customer.idmunicipio });
      }
    }
     // Set the value of email2 like as response from API
     this.customerForm.patchValue({ tipofactura: this.customer.tipofactura });
  }

  updateCustomer() {
    this.customerForm.patchValue({ nit: this.id.nit });
    const idTercero = this.customer.idtercero!.toString();
    const DTOCustomer: CustomerDto = {
      nit:	         this.customerForm.get('nit')?.value,
      digito:	       this.customerForm.get('digito')?.value,
      tipopersona:	 1,
      nombres:	     this.customerForm.get('nombres')?.value,
      nombre2:	     this.customerForm.get('nombre2')?.value,
      apellidos:	   this.customerForm.get('apellidos')?.value,
      apellido2:	   this.customerForm.get('apellido2')?.value,
      nomcomercial:	 this.customerForm.get('nombres')?.value,
      direccion:	   this.customerForm.get('direccion')?.value,
      telefono:	     this.customerForm.get('telefono')?.value,
      email:	       this.customerForm.get('email')?.value,
      email2:	       this.customerForm.get('email2')?.value,
      iddepto:	     this.customerForm.get('iddepto')?.value,
      idmunicipio:	 this.customerForm.get('idmunicipio')?.value,
      TipoId:	       this.customerForm.get('TipoId')?.value,
      tipofactura:	 this.customerForm.get('tipofactura')?.value,
      cliente:	     1,
      idregimen:	   2,
      aplicaprom:	   1,
      idclasifterc:	 1,
      inactivo:	     0,
      usapuntos:	   1,
      idpais:	       this.customerForm.get('idpais')?.value,
    }
    this.customerService.updateCustomer( idTercero, DTOCustomer ).subscribe( rta => console.log( rta ));
    this.customerForm.reset()
  }

  ////////// Create Customer \\\\\\\\\\

  isValidField( field: string ): boolean | null {
    return this.customerForm.controls[ field ].errors && this.customerForm.controls[ field ].touched
  }

  getFieldError( field: string ): string | null {
    if (!this.customerForm.controls[ field ] ) return null ;
    const errors = this.customerForm.controls[ field ].errors || {};
    for (const key of Object.keys( errors )) {
      switch( key ) {
        case 'required':
          return '*Este campo es requrido';
        case 'minLength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;
        case 'email':
          return `Email no valido`;
        case 'pattern':
          return `Solo números`;
      }
    }

    return null;
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
      this.customerForm.patchValue({ digito: digitoVerificacion });
    }
  }

  createCustomer() {
    this.customerForm.patchValue({ nit: this.id.nit.toString() });
    const DTOCustomer = {
      nit:	         this.customerForm.get('nit')?.value,
      digito:	       this.customerForm.get('digito')?.value,
      tipopersona:	 1,
      nombres:	     this.customerForm.get('nombres')?.value,
      nombre2:	     this.customerForm.get('nombre2')?.value,
      apellidos:	   this.customerForm.get('apellidos')?.value,
      apellido2:	   this.customerForm.get('apellido2')?.value,
      nomcomercial:	 this.customerForm.get('nombres')?.value,
      direccion:	   this.customerForm.get('direccion')?.value,
      telefono:	     this.customerForm.get('telefono')?.value,
      email:	       this.customerForm.get('email')?.value,
      email2:	       this.customerForm.get('email2')?.value,
      iddepto:	     this.customerForm.get('iddepto')?.value,
      idmunicipio:	 this.customerForm.get('idmunicipio')?.value,
      TipoId:	       this.customerForm.get('TipoId')?.value,
      tipofactura:	 this.customerForm.get('tipofactura')?.value,
      cliente:	     1,
      idregimen:	   2,
      aplicaprom:	   1,
      idclasifterc:	 1,
      inactivo:	     0,
      usapuntos:	   1,
      idpais:	       this.customerForm.get('idpais')?.value,
    }
    this.customerService.createCustomer( DTOCustomer )
      .subscribe( rta => {
        console.log( rta );
      });
    this.customerForm.reset();
  }

}
