import { ObjectComboDTO } from "./objectCombo.dto";
import { ObjectIDDTO } from "./objectID.dto";

export class TicketDetalleUpdateDTO {
  id: string;
  cantidad: number;
  totalConImpuestos: number;
  idEstadoLinea: ObjectIDDTO = new ObjectIDDTO('1');

  constructor(
    id: string,
    cantidad: number,
    totalConImpuestos: number
  ) {
    this.id = id;
    this.cantidad = cantidad;
    this.totalConImpuestos = totalConImpuestos;
  }
} 