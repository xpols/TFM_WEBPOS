import { FormasPagoDTO } from "./formasPago.dto";

export class ObjectComboFamiliasFPDTO {
    id: string;
    codigo: string;
    descripcion: string;
    formasPago: FormasPagoDTO[] | undefined = [];
    importe: string = '0,00';
    formasPagoSelected: string | undefined;
    idLineaGuardada: string | undefined;

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