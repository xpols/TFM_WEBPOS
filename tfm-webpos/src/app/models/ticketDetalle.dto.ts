import { ObjectComboDTO } from "./objectCombo.dto";
import { ObjectIDDTO } from "./objectID.dto";

export class TicketDetalleDTO {
  id: string;
  agrupacionPromociones: string;
  baseImponible: number;
  cantidad: number;
  fechaHora: Date | string;
  fechaHoraFinElaboracion: Date | null | string;
  fechaHoraFinElaboracionTeorico: Date | null | string;
  fechaHoraInicioElaboracion: Date | null | string;
  fechaHoraSeleccionado: Date | null | string;
  fechaHoraServido: Date | null | string;
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
  totalPortesSinImpuestos: number;

  idDocumentoComercial: ObjectIDDTO | undefined;
  idLineaPadre: ObjectIDDTO | undefined;
  idProducto: ObjectIDDTO | undefined;
  idPromocion: ObjectIDDTO | undefined;
  idEleccionProducto: ObjectIDDTO | undefined;
  idAlmacen: ObjectIDDTO | undefined;
  idEstadoLinea: ObjectIDDTO | undefined;
  precioManual: boolean = false;
  importeRealMenuSinSuplemento: number = 0;
  totalPortesConImpuestos: number = 0;
  detallesAsociados: TicketDetalleDTO[] = [];

  constructor(
    id: string,
    agrupacionPromociones: string,
    baseImponible: number,
    cantidad: number,
    fechaHora: Date | string,
    fechaHoraFinElaboracion: Date | null | string,
    fechaHoraFinElaboracionTeorico: Date | null | string,
    fechaHoraInicioElaboracion: Date | null | string,
    fechaHoraSeleccionado: Date | null | string,
    fechaHoraServido: Date | null | string,
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
    totalPortesSinImpuestos: number,
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
    this.totalPortesSinImpuestos = totalPortesSinImpuestos;
  }
} 