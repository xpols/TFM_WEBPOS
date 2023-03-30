export class TiendaDTO {
    id: string;
    codigo: string;
    descripcion: string;

    constructor(
        id: string,
        codigo: string,
        descripcion: string
      ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
      }
} 