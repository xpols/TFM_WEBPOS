import { ConfigTextosDTO } from "./configTextos.dto";
import { ObjectIDDTO } from "./objectID.dto";

export class ConfigTextosAgrupacionDTO {
    id: string;
    idConfigTicket: ConfigTextosDTO;

    constructor(
        id: string,
        idConfigTicket: ConfigTextosDTO,
      ) {
        this.id = id;
        this.idConfigTicket = idConfigTicket;
    }
} 