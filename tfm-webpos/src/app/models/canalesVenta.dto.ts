export class CanalesVentaDTO {
    id: string;
    codigo: string;
    descripcion: string;
    descripcionAbreviada: string | undefined;
  
    constructor(
        id: string,
        codigo: string,
        descripcion: string,
        descripcionAbreviada: string,
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.descripcionAbreviada = descripcionAbreviada;
    }
  } 