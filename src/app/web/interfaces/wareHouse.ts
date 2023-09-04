export interface House {
    idalmacen: number;
    codalmacen: number;
    nomalmacen: string;
    tiendavirtual: number;
}

export interface WareHouse {
    warehouse?: House;
    virtualStoreId: number;
    wareHouseId: number;
}