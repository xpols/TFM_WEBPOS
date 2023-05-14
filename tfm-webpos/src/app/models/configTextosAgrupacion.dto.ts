import { ObjectIDDTO } from "./objectID.dto";

export class ConfigTextosAgrupacionDTO {
    id: string;
    idConfigTicket: ObjectIDDTO;

    constructor(
        id: string,
        idConfigTicket: ObjectIDDTO,
      ) {
        this.id = id;
        this.idConfigTicket = idConfigTicket;
    }
} 