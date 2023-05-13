import { ObjectComboDTO } from "./objectCombo.dto";
import { ObjectIDDTO } from "./objectID.dto";

export class TicketPagoDTO {
  id: string;
  item: number;
  idFormaPago_descripcion: ObjectComboDTO;
	idDivisa_descripcion: ObjectComboDTO;
  importe: number;
  fechaVencimiento: Date | string;
  comentarios: string | undefined;
  idDocumentoComercial_codigo: ObjectComboDTO;
	codigoVale: string | undefined;
  idTipoVale_descripcion: ObjectComboDTO | undefined;
  importeVale: number | undefined;
  cantidadVale: number | undefined;
  modoLecturaValeAutomatico: boolean = false;
	devuelveCambio: boolean = false;
	importeCambioNoDevuelto: number = 0;
	permitePagoOnline: boolean = false;
	pagadoOnline: boolean = false;

  idDocumentoComercial: ObjectIDDTO | undefined;
  idFormaPago: ObjectIDDTO = new ObjectIDDTO('');
  idDivisa: ObjectIDDTO | undefined;
  idTipoVale: ObjectIDDTO | undefined;
  idFamiliaFormaPago: string | undefined;

  constructor(
    id: string,
    item: number,
    idFormaPago_descripcion: ObjectComboDTO,
    idDivisa_descripcion: ObjectComboDTO,
    importe: number,
    fechaVencimiento: Date | string,
    idDocumentoComercial_codigo: ObjectComboDTO
  ) {
    this.id = id;
    this.item = item;
    this.idFormaPago_descripcion = idFormaPago_descripcion;
    this.idDivisa_descripcion = idDivisa_descripcion;
    this.importe = importe;
    this.fechaVencimiento = fechaVencimiento;
    this.idDocumentoComercial_codigo = idDocumentoComercial_codigo;
  }
} 