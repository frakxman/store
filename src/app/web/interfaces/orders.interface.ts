export interface ItradeOrderHeader {
    numero:         number;
    idtercero:      number;
    fecha:          string;
    idvendedor:     number;
    subtotal:       number;
    valortotal:     number;
    valimpuesto:    number;
    valdescuentos:  number;
    valretenciones: number;
    valiva:         number;
    idalmacen:      number;
    estado:         number;
    detalle?:       string;
    fechacrea:      string;
    hora:           string;
    idsoftware:     number;
    plazo:          number;
    detpedidos:     ItradeOrderDetail[];
}


export interface ItradeOrderDetail {
    idpedido:   string;
    idproducto: number;
    cantidad:   number;
    valorprod:  number;
    descuento:  number;
    porcdesc:   number;
    codiva:     string;
    porciva?:   number;
    costoprod:  number;
    despachado: number;
    base:       number;
    ivaprod:    number;
}

export interface OrderResp {
        order: {
            numero: number,
            subtotal: number,
            valor_impuesto: number,
            valor_total: number,
            fecha: string,
            hora: string,
            nit: number,
            nombres: string,
            apellidos: string,
            email: string,
            almacen: string,
            descuentos: number
        },
        products: ProductResp[]
}

export interface ProductResp {
    idproducto: number,
    descripcion: string,
    valorprod: number,
    descuento: number,
    porcdesc: number,
    cantidad: number
}