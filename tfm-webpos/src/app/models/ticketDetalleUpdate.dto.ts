import { ObjectComboDTO } from "./objectCombo.dto";

export class TicketDetalleUpdateDTO {
  id: string;
  cantidad: number;

  constructor(
    id: string,
    cantidad: number
  ) {
    this.id = id;
    this.cantidad = cantidad;
  }
} 