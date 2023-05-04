import { ObjectComboDTO } from "./objectCombo.dto";

export class TicketCabeceraDTO {
  id: string;
  codigo: string;
  descuentoTotalConImpuestos: number;
  fechaHora: Date;
  fechaJornada: Date;
  idCanalVenta_descripcion: ObjectComboDTO;
  idCliente_nombre: ObjectComboDTO;
  idDivisa_descripcion: ObjectComboDTO;
  idEmpleadoTPV_nombre: ObjectComboDTO;
  idEstadoDocumento_descripcion: ObjectComboDTO;
  idTPV_descripcion: ObjectComboDTO;
  idTienda_descripcion: ObjectComboDTO;
  totalBruto: number;
  totalConImpuestos: number;
  totalSinImpuestos: number;
  mesa: string;

  constructor(
    id: string,
    codigo: string,
    descuentoTotalConImpuestos: number,
    fechaHora: Date,
    fechaJornada: Date,
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
    mesa: string
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
  }
} 