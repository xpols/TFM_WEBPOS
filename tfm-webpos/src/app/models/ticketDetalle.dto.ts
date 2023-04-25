import { ObjectComboDTO } from "./objectCombo.dto";

export class TicketDetalleDTO {
  id: string;
  agrupacionPromociones: string;
  baseImponible: number;
  cantidad: number;
  fechaHora: Date;
  fechaHoraFinElaboracion: Date | null;
  fechaHoraFinElaboracionTeorico: Date | null;
  fechaHoraInicioElaboracion: Date | null;
  fechaHoraSeleccionado: Date | null;
  fechaHoraServido: Date | null;
  idAlmacen_descripcion: ObjectComboDTO;
  idDocumentoComercial_codigo: ObjectComboDTO;
  idEleccionProducto_id: ObjectComboDTO;
  idLineaPadre_item: ObjectComboDTO;
  idPersonal_nombre: ObjectComboDTO
  idProducto_codigo: ObjectComboDTO;
  idProducto_nombre: ObjectComboDTO;
  idPromocion_descripcion: ObjectComboDTO;
  idUnidadMedidaVenta_descripcion: ObjectComboDTO;
  precioUnitarioConImpuestos: number;
  precioUnitarioSinImpuestos: number;
  importeBrutoSinDescuentos: number;
  importeCobrado: number;
  totalConImpuestos: number;

  constructor(
    id: string,
    agrupacionPromociones: string,
    baseImponible: number,
    cantidad: number,
    fechaHora: Date,
    fechaHoraFinElaboracion: Date | null,
    fechaHoraFinElaboracionTeorico: Date | null,
    fechaHoraInicioElaboracion: Date | null,
    fechaHoraSeleccionado: Date | null,
    fechaHoraServido: Date | null,
    idAlmacen_descripcion: ObjectComboDTO,
    idDocumentoComercial_codigo: ObjectComboDTO,
    idEleccionProducto_id: ObjectComboDTO,
    idLineaPadre_item: ObjectComboDTO,
    idPersonal_nombre: ObjectComboDTO,
    idProducto_codigo: ObjectComboDTO,
    idProducto_nombre: ObjectComboDTO,
    idPromocion_descripcion: ObjectComboDTO,
    idUnidadMedidaVenta_descripcion: ObjectComboDTO,
    precioUnitarioConImpuestos: number,
    precioUnitarioSinImpuestos: number,
    importeBrutoSinDescuentos: number,
    importeCobrado: number,
    totalConImpuestos: number,
  ) {
    this.id = id;
    this.agrupacionPromociones = agrupacionPromociones;
    this.baseImponible = baseImponible;
    this.cantidad = cantidad;
    this.fechaHora = fechaHora;
    this.fechaHoraFinElaboracion = fechaHoraFinElaboracion;
    this.fechaHoraFinElaboracionTeorico = fechaHoraFinElaboracionTeorico;
    this.fechaHoraInicioElaboracion = fechaHoraInicioElaboracion;
    this.fechaHoraSeleccionado = fechaHoraSeleccionado;
    this.fechaHoraServido = fechaHoraServido;
    this.idAlmacen_descripcion = idAlmacen_descripcion;
    this.idDocumentoComercial_codigo = idDocumentoComercial_codigo;
    this.idEleccionProducto_id = idEleccionProducto_id;
    this.idLineaPadre_item = idLineaPadre_item;
    this.idPersonal_nombre = idPersonal_nombre;
    this.idProducto_codigo = idProducto_codigo;
    this.idProducto_nombre = idProducto_nombre;
    this.idPromocion_descripcion = idPromocion_descripcion;
    this.idUnidadMedidaVenta_descripcion = idUnidadMedidaVenta_descripcion;
    this.precioUnitarioConImpuestos = precioUnitarioConImpuestos;
    this.precioUnitarioSinImpuestos = precioUnitarioSinImpuestos;
    this.importeBrutoSinDescuentos = importeBrutoSinDescuentos;
    this.importeCobrado = importeCobrado;
    this.totalConImpuestos = totalConImpuestos;
  }
} 