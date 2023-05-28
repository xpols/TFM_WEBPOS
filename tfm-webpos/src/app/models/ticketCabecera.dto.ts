import { ObjectComboDTO } from "./objectCombo.dto";
import { ObjectIDDTO } from "./objectID.dto";

export class TicketCabeceraDTO {
  id: string;
  codigo: string;
  descuentoTotalConImpuestos: number;
  fechaHora: Date | string;
  fechaJornada: Date | string;
  idCanalVenta_descripcion: ObjectComboDTO;
  idCanalVenta: ObjectIDDTO | undefined;
  idCliente_nombre: ObjectComboDTO;
  idDivisa_descripcion: ObjectComboDTO;
  idDivisa: ObjectIDDTO | undefined;
  idEmpleadoTPV_nombre: ObjectComboDTO;
  idEstadoDocumento_descripcion: ObjectComboDTO;
  idTPV_descripcion: ObjectComboDTO;
  idTPV: ObjectIDDTO | undefined;
  idTienda_descripcion: ObjectComboDTO;
  idTienda: ObjectIDDTO | undefined;
  totalBruto: number;
  totalConImpuestos: number;
  totalSinImpuestos: number;
  mesa: string;
  horaInicioCreacionDocumento: Date | string;
  horaFinCreacionDocumento: Date | string;
  importeCambioNoDevuelto: number;
  importeCambioDevuelto: number;
  esDefintivo: boolean;
  totalTransporteSinImpuestos: number;
  totalEnvoltorioSinImpuestos: number;
  totalEnvoltorioConImpuestos: number;
  numeroComensales: number;
  numeroOrden: number;
  descuentoTotalSinImpuestos: number;
  tasaEnvoltorioImpuestos: number;
  tasaTransporteImpuestos: number;
  numeroTicket: string;
  idCliente: ObjectIDDTO | undefined;
  numeroPartesIguales: number;
  idPlataformaVenta: ObjectComboDTO;
  importePropina: number;
  numeroRepeticionesTicket: number;
  idDominio: ObjectIDDTO;
  idEstadoDocumento: ObjectIDDTO | undefined;
  /*lineasDescuentos: any[] = [];
  lineasDetalle: any[] = [];
  lineasImpuestos: any[] = [];
  lineasVencimeintos: any[] = [];*/


  constructor(
    id: string,
    codigo: string,
    descuentoTotalConImpuestos: number,
    fechaHora: Date | string,
    fechaJornada: Date | string,
    idCanalVenta_descripcion: ObjectComboDTO,
    idCliente_nombre: ObjectComboDTO,
    idDivisa_descripcion: ObjectComboDTO,
    idEmpleadoTPV_nombre: ObjectComboDTO,
    idEstadoDocumento_descripcion: ObjectComboDTO,
    idTPV_descripcion: ObjectComboDTO,
    idTienda_descripcion: ObjectComboDTO,
    totalBruto: number,
    totalConImpuestos: number,
    totalSinImpuestos: number,
    mesa: string,
    horaInicioCreacionDocumento: Date | string,
    horaFinCreacionDocumento: Date | string,
    importeCambioNoDevuelto: number,
    importeCambioDevuelto: number,
    esDefintivo: boolean,
    totalTransporteSinImpuestos: number,
    totalEnvoltorioSinImpuestos: number,
    totalEnvoltorioConImpuestos: number,
    numeroComensales: number,
    numeroOrden: number,
    descuentoTotalSinImpuestos: number,
    tasaEnvoltorioImpuestos: number,
    tasaTransporteImpuestos: number,
    numeroTicket: string,
    numeroPartesIguales: number,
    idPlataformaVenta: ObjectComboDTO,
    importePropina: number,
    numeroRepeticionesTicket: number,
    idDominio: ObjectIDDTO
  ) {
    this.id = id;
    this.codigo = codigo;
    this.descuentoTotalConImpuestos = descuentoTotalConImpuestos;
    this.fechaHora = fechaHora;
    this.fechaJornada = fechaJornada;
    this.idCanalVenta_descripcion = idCanalVenta_descripcion;
    this.idCliente_nombre = idCliente_nombre;
    this.idDivisa_descripcion = idDivisa_descripcion;
    this.idEmpleadoTPV_nombre = idEmpleadoTPV_nombre;
    this.idEstadoDocumento_descripcion = idEstadoDocumento_descripcion;
    this.idTPV_descripcion = idTPV_descripcion;
    this.idTienda_descripcion = idTienda_descripcion;
    this.totalBruto = totalBruto;
    this.totalConImpuestos = totalConImpuestos;
    this.totalSinImpuestos = totalSinImpuestos;
    this.mesa = mesa;
    this.horaInicioCreacionDocumento = horaInicioCreacionDocumento;
    this.horaFinCreacionDocumento = horaFinCreacionDocumento;
    this.importeCambioNoDevuelto = importeCambioNoDevuelto;
    this.importeCambioDevuelto = importeCambioDevuelto;
    this.esDefintivo = esDefintivo;
    this.totalTransporteSinImpuestos = totalTransporteSinImpuestos;
    this.totalEnvoltorioSinImpuestos = totalEnvoltorioSinImpuestos;
    this.totalEnvoltorioConImpuestos = totalEnvoltorioConImpuestos;
    this.numeroComensales = numeroComensales;
    this.numeroOrden = numeroOrden;
    this.descuentoTotalSinImpuestos = descuentoTotalSinImpuestos;
    this.tasaEnvoltorioImpuestos = tasaEnvoltorioImpuestos;
    this.tasaTransporteImpuestos = tasaTransporteImpuestos;
    this.numeroTicket = numeroTicket;
    this.numeroPartesIguales = numeroPartesIguales;
    this.idPlataformaVenta = idPlataformaVenta;
    this.importePropina = importePropina;
    this.numeroRepeticionesTicket = numeroRepeticionesTicket;
    this.idDominio = idDominio;
  }
} 