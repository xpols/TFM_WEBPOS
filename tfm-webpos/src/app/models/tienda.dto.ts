import { ObjectIDDTO } from "./objectID.dto";

export class TiendaDTO {
    id: string;
    codigo: string;
    descripcion: string;
    almacenes: ObjectIDDTO[] | undefined;
    canalesVenta: ObjectIDDTO[] | undefined;
    formasPago: ObjectIDDTO[] | undefined;
    idDivisaDefault: ObjectIDDTO | undefined;

    constructor(
        id: string,
        codigo: string,
        descripcion: string,
        almacenes: ObjectIDDTO[],
        canalesVenta: ObjectIDDTO[],
        formasPago: ObjectIDDTO[],
        idDivisaDefault: ObjectIDDTO
      ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.almacenes = almacenes;
        this.canalesVenta = canalesVenta;
        this.formasPago = formasPago;
        this.idDivisaDefault = idDivisaDefault;
      }
} 