import { ObjectIDDTO } from "./objectID.dto";
import { TicketCabeceraDTO } from "./ticketCabecera.dto";
import { TicketDetalleDTO } from "./ticketDetalle.dto";
import { TicketPagoDTO } from "./ticketPago.dto";

export interface DataPrint {
    ticket: TicketCabeceraDTO | undefined;
    detalles: TicketDetalleDTO[] | undefined;
    pagos: TicketPagoDTO[] | undefined;
    totalPagado: number;
    cambio: number;
}
