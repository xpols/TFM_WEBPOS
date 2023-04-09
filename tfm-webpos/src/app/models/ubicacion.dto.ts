import { ObjectIDDTO } from "./objectID.dto";

export class UbicacionDTO {
    id: string;
    idMedida: ObjectIDDTO;

    constructor(
        id: string,
        idMedida: ObjectIDDTO,
      ) {
        this.id = id;
        this.idMedida = idMedida;
    }
} 