import { FormasPagoDTO } from "./formasPago.dto";
import { ObjectComboDTO } from "./objectCombo.dto";
import { ObjectIDDTO } from "./objectID.dto";

export class TicketFormasPagoDTO {
  id: string;
  cantidadVale: number;
  codigoVale: string | null;
  comentarios: string | null;
  devuelveCambio: boolean;
  fechaVencimiento: Date | string;
  idDivisa_descripcion: ObjectComboDTO;
  idDivisa: ObjectIDDTO | undefined;
  idDocumentoComercial_codigo: ObjectComboDTO;
  idDocumentoComercial: ObjectIDDTO | undefined;
  idFormaPago_descripcion: ObjectComboDTO | undefined;
  idFormaPago: ObjectIDDTO | undefined;
  idTipoVale_descripcion: ObjectComboDTO | undefined;
  idTipoVale: ObjectIDDTO | undefined;
  importe: number;
  importeCambioNoDevuelto: number | null;
  importeVale: number | null;
  item: number;
  modoLecturaValeAutomatico: number | null;
  pagadoOnline: boolean | null;
  permitePagoOnline: boolean | null;
  descripcion: string;
  familiasFormaPago: FormasPagoDTO[];

  constructor(
    id: string,
    cantidadVale: number,
    codigoVale: string | null,
    comentarios: string | null,
    devuelveCambio: boolean,
    fechaVencimiento: Date | string,
    idDivisa_descripcion: ObjectComboDTO,
    idDivisa: ObjectIDDTO | undefined,
    idDocumentoComercial_codigo: ObjectComboDTO,
    idDocumentoComercial: ObjectIDDTO | undefined,
    idFormaPago_descripcion: ObjectComboDTO | undefined,
    idFormaPago: ObjectIDDTO | undefined,
    idTipoVale_descripcion: ObjectComboDTO | undefined,
    idTipoVale: ObjectIDDTO | undefined,
    importe: number,
    importeCambioNoDevuelto: number | null,
    importeVale: number | null,
    item: number,
    modoLecturaValeAutomatico: number | null,
    pagadoOnline: boolean | null,
    permitePagoOnline: boolean | null,
    descripcion: string,
    familiasFormaPago: FormasPagoDTO[]
  ) {
    this.id = id;
    this.cantidadVale = cantidadVale;
    this.codigoVale = codigoVale;
    this.comentarios = comentarios;
    this.devuelveCambio = devuelveCambio;
    this.fechaVencimiento = fechaVencimiento;
    this.idDivisa_descripcion = idDivisa_descripcion;
    this.idDivisa = idDivisa;
    this.idDocumentoComercial_codigo = idDocumentoComercial_codigo;
    this.idDocumentoComercial = idDocumentoComercial;
    this.idFormaPago_descripcion = idFormaPago_descripcion;
    this.idFormaPago = idFormaPago;
    this.idTipoVale_descripcion = idTipoVale_descripcion;
    this.idTipoVale = idTipoVale;
    this.importe = importe;
    this.importeCambioNoDevuelto = importeCambioNoDevuelto;
    this.importeVale = importeVale;
    this.item = item;
    this.modoLecturaValeAutomatico = modoLecturaValeAutomatico;
    this.pagadoOnline = pagadoOnline;
    this.permitePagoOnline = permitePagoOnline;
    this.descripcion = descripcion;
    this.familiasFormaPago = familiasFormaPago;
  }
} 