export class TicketCabeceraDTO {
  id: string;
  codigo: string;
  descuentoTotalConImpuestos: number;
  fechaHora: Date;
  fechaJornada: Date;
  idCanalVenta_descripcion: object;
  idCliente_nombre: object;
  idDivisa_descripcion: object;
  idEmpleadoTPV_nombre: object;
  idEstadoDocumento_descripcion: object;
  idTPV_descripcion: object;
  idTienda_descripcion: object;
  totalBruto: number;
  totalConImpuestos: number;
  totalSinImpuestos: number;

  constructor(
    id: string,
    codigo: string,
    descuentoTotalConImpuestos: number,
    fechaHora: Date,
    fechaJornada: Date,
    idCanalVenta_descripcion: object,
    idCliente_nombre: object,
    idDivisa_descripcion: object,
    idEmpleadoTPV_nombre: object,
    idEstadoDocumento_descripcion: object,
    idTPV_descripcion: object,
    idTienda_descripcion: object,
    totalBruto: number,
    totalConImpuestos: number,
    totalSinImpuestos: number,
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
  }
} 