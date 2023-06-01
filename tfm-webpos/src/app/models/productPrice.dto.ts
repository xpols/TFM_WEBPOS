export class productPriceDTO {
    idProduct: number | undefined;
    descripcion: string | undefined;
    precio: number | undefined;
    accion: string = '';
    idDetalle: string = '';
    

    constructor(
        idProduct: number | undefined,
        descripcion: string | undefined,
        precio: number | undefined
      ) {
        this.idProduct = idProduct;
        this.descripcion = descripcion;
        this.precio = precio;
    }
} 