import { ObjectIDDTO } from "./objectID.dto";

export class TicketCabeceraCanceladoDTO {
  id: string;
  idEstadoDocumento: ObjectIDDTO;


  constructor(
    id: string
  ) {
    this.id = id;
    this.idEstadoDocumento = new ObjectIDDTO('6');
  }
} 