export class TarifasVentaDTO {
    id: string;
    codigo: string;
    descripcion: string;
    activa: boolean;
    fechaFinal: string;
    fechaInicial: string;
    horaFinal: string;
    horaInicial: string;
  
    constructor(
        id: string,
        codigo: string,
        descripcion: string,
        activa: boolean,
        fechaFinal: string,
        fechaInicial: string,
        horaFinal: string,
        horaInicial: string
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.activa = activa;
        this.fechaFinal = fechaFinal;
        this.fechaInicial = fechaInicial;
        this.horaFinal = horaFinal;
        this.horaInicial = horaInicial;
    }
  } 