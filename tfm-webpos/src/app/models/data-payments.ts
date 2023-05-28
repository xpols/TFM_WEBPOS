import { ObjectIDDTO } from "./objectID.dto";
import { TicketPagoDTO } from "./ticketPago.dto";

export interface DataPayments {
    total: number;
    totalPagado: number;
    cambio: number;
    pagos: TicketPagoDTO[];
    idDocumentoComercial: ObjectIDDTO | undefined;
}
