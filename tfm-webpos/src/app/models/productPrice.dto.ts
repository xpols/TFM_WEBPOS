export class productPriceDTO {
    idProduct: number | undefined;
    descripcion: string | undefined;
    precio: number | undefined;
    accion: string = '';
    idDetalle: string = '';
    idPadre: string = '';
    idEleccionProducto_id: string = '';
    cantidad: number = 1;
    

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