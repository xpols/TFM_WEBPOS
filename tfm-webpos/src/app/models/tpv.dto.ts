export class TpvDTO {
    id: string;
    codigo: string;
    descripcion: string;
    idTienda_descripcion: object;

    constructor(
        id: string,
        codigo: string,
        descripcion: string,
        idTienda_descripcion: object
      ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.idTienda_descripcion = idTienda_descripcion;
      }
} 