export interface Product {
    idproducto: number;
    costo: number;
    ultcosto: number;
    codiva: string;
    precioventa: number;
    descripcion: string;
    barcode: string;
    codigo: string;
    cantidad: number;
    nomalmacen: string;
    Description_Store: string;
    Urls_Img: string;
    porcentaje: number,
    baseValue: number,
    taxValue: number,
    store: number
}

export interface UpdateProductDTO extends Omit<Product, 'idproducto' | 'barcode' | 'descripcion' | 'Description_Store' | 'precioventa' | 'costo' | 'ultcosto' | 'store'> {
    precioespecial1: number,
    precioespecial2: number,
    // barcode: string,
    // descripcion: string,
    // Description_Store: string,
    // precioventa: number,
    // costo: number,
    // ultcosto: number
}

export interface UploadProductImage {
    Urls_Img: string;
}