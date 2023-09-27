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
    porcentaje: number,
    product_photo: string[];
    baseValue: number,
    taxValue: number,
}

export interface UpdateProductDTO extends Omit<Product, 'idproducto' | 'barcode' | 'descripcion' | 'Description_Store' | 'precioventa' | 'costo' | 'ultcosto'> {
    precioespecial1: number,
    precioespecial2: number,
}

export interface UploadProductImage {
    Urls_Img: string;
}