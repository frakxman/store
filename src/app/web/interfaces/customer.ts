export interface CustomerResp {
    idtercero?:       number;
    digito:          number;
    nit:             string;
    nombres:         string;
    nombre2:         string;
    apellidos:       string;
    apellido2:       string;
    nomcomercial?:    string;
    direccion:       string;
    telefono:        string;
    email:           string;
    email2:          string;
    idpais:          number;
    idmunicipio:     number;
    TipoId:          string;
    tipopersona?:     number;
    regiRenta?:       null;
    autoretenedor?:   number;
    matriculamercan?: null;
    inactivo?:        number;
    idclasifterc?:    number;
    usapuntos?:       number;
    tipofactura:     number;
    iddepto:         number;
    cliente?:         number;
    idactividad?:     null;
    idregimen?:       number;
    aplicaprom?:      number;
}

export interface Nit {
    nit: string;
}

export interface updateCustomerDto {
    nit:	         string;
    digito:	         number;
    tipopersona:	 number;
    nombres:	     string;
    nombre2:	     string;
    apellidos:	     string;
    apellido2:	     string;
    nomcomercial:	 string;
    direccion:	     string;
    telefono:	     string;
    email:	         string;
    email2:	         string;
    iddepto:	     number;
    idmunicipio:	 number;
    TipoId:	         string;
    tipofactura:	 number;
    cliente:	     number;
    idactividad:	 number;
    idregimen:	     number;
    aplicaprom:	     number;
    idclasifterc:	 number;
    inactivo:	     number;
    usapuntos:	     number;
    idpais:	         number;
    matriculamercan: string;
    RegiRenta:	     string;
    autoretenedor:	 number;
}


