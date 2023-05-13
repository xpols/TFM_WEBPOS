import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstants } from '../constants/constants';
import { UbicacionesDTO } from '../models/ubicaciones.dto';
import { UbicacionDTO } from '../models/ubicacion.dto';
import { ConfigProductosDTO } from '../models/configProductos.dto';
import { CategoriasDTO } from '../models/categorias.dto';
import { ProductosDTO } from '../models/productos.dto';
import { TarifasVentaDTO } from '../models/tarifasVenta.dto';
import { TarifasVentaPreciosDTO } from '../models/tarifasVentaPrecios.dto';
import { TicketCabeceraDTO } from '../models/ticketCabecera.dto';
import { TicketDetalleDTO } from '../models/ticketDetalle.dto';
import { TicketDetalleUpdateDTO } from '../models/ticketDetalleUpdate.dto';
import { FormasPagoDTO } from '../models/formasPago.dto';
import { TicketCabeceraCanceladoDTO } from '../models/ticketCabeceraCancel.dto';
import { TicketPagoDTO } from '../models/ticketPago.dto';

@Injectable({
  providedIn: 'root'
})
export class MainSalesService {

  constructor(private http: HttpClient) { }

  getUbicaciones(codigoTienda: string | null): Promise<UbicacionesDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('filters', '[{"field":"idTipoAgrupacion.codigo","type":"codigo","op":"equals","listValues":[{"value":"002"}]}]');
    params = params.append('filtersHijos', '[{"field":"tiendas.codigo","type":"codigo","op":"equals","listValues":[{"value":"'+codigoTienda+'"}]}]');
    params = params.append('option','fields');
    params = params.append('fields', 'id,codigo');
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<UbicacionesDTO[]>(APIConstants.API_URL + 'confTPVAgrupacionesLocales', {params: params})
      .toPromise();
  }

  getUbicacion(idUbicacion: string): Promise<UbicacionDTO|undefined> {
    return this.http
      .get<UbicacionDTO>(APIConstants.API_URL + 'confTPVAgrupacionesLocales/'+idUbicacion)
      .toPromise();
  }

  getRecuperarConfiguracion(idMedida: string , idUbicacion: string): Promise<ConfigProductosDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('idMedida', idMedida);
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<ConfigProductosDTO[]>(APIConstants.API_URL + 'posicionObjetosConfiguracion/'+idUbicacion+'/recuperarConfiguracion', {params: params})
      .toPromise();
  }

  getCategorias(idDominio: string): Promise<CategoriasDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    params = params.append('contador', true);
    params = params.append('idDominio', idDominio);
    
    return this.http
      .get<CategoriasDTO[]>(APIConstants.API_URL + 'categoriasPlataformasVenta/', {params: params})
      .toPromise();
  }

  getProductos(idDominio: string): Promise<ProductosDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    params = params.append('contador', true);
    params = params.append('idDominio', idDominio);
    
    return this.http
      .get<ProductosDTO[]>(APIConstants.API_URL + 'productos/', {params: params})
      .toPromise();
  }

  getTarifas(idDominio: string, codigoTienda: string | null): Promise<TarifasVentaDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    params = params.append('contador', false);
    params = params.append('idDominio', idDominio);
    params = params.append('filters','[{"field":"activa","type":"boolean","op":"equals","listValues":[{"value":true}]}]');
    params = params.append('filtersHijos','[{"field":"tiendas.codigo","type":"codigo","op":"like","listValues":[{"value":"'+codigoTienda+'"}]}]');
    params = params.append('grupoTiendaSeleccionada', 'A');
    params = params.append('orders', '[{"order":[{"field":"fechaInicial","value":"desc"}]}]');
    
    return this.http
      .get<TarifasVentaDTO[]>(APIConstants.API_URL + 'tarifasVenta/', {params: params})
      .toPromise();
  }

  getTarifaPrecios(idDominio: string, idTarifa: string | null): Promise<TarifasVentaPreciosDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    params = params.append('idDominio', idDominio);
    params = params.append('filtrosComplementarios', '[{"field":"idTarifa.id","type":"numeric","op":"equals","listValues":[{"value":'+idTarifa+'}]}]');
    
    return this.http
      .get<TarifasVentaPreciosDTO[]>(APIConstants.API_URL + 'tarifasPreciosVenta/', {params: params})
      .toPromise();
  }

  getTicketCabecera(idTicket: string | undefined): Promise<TicketCabeceraDTO|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'A');
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<TicketCabeceraDTO>(APIConstants.API_URL + 'pedidosVentaCabeceras/'+idTicket, {params: params})
      .toPromise();
  }

  getTicketTotales(idTicket: string | undefined): Promise<any> {
    let params = new HttpParams();
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<any>(APIConstants.API_URL + 'pedidosVentaCabeceras/'+idTicket+'/getTotales', {params: params})
      .toPromise();
  }

  getTicketDetalles(idTicket: string | undefined): Promise<TicketDetalleDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'A');
    params = params.append('filtrosComplementarios','[{"field":"idDocumentoComercial.id","type":"numeric","op":"equals","listValues":[{"value":'+idTicket+'}]},{"field":"idEstadoLinea.id","type":"numeric","op":"notequals","listValues":[{"value":"2"}]}]');
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<TicketDetalleDTO[]>(APIConstants.API_URL + 'pedidosVentaLineasDetalle/', {params: params})
      .toPromise();
  }

  getTicketPagos(idTicket: string | undefined): Promise<TicketPagoDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'A');
    params = params.append('filtrosComplementarios','[{"field":"idDocumentoComercial.id","type":"numeric","op":"equals","listValues":[{"value":'+idTicket+'}]}]');
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<TicketPagoDTO[]>(APIConstants.API_URL + 'pedidosVentaLineasVencimientos/', {params: params})
      .toPromise();
  }

  createTicket(ticket: TicketCabeceraDTO | undefined): Promise<TicketCabeceraDTO|undefined> {
    return this.http.post<TicketCabeceraDTO>(APIConstants.API_URL + 'pedidosVentaCabeceras', ticket).toPromise();
  }

  updateTicketCabecera(ticket: TicketCabeceraDTO): Promise<TicketCabeceraDTO|undefined> {
    return this.http.put<TicketCabeceraDTO>(APIConstants.API_URL + 'pedidosVentaCabeceras/'+ticket.id, ticket).toPromise();
  }

  updateTicketDetail(detalle: TicketDetalleUpdateDTO): Promise<TicketDetalleDTO|undefined> {
    return this.http.put<TicketDetalleDTO>(APIConstants.API_URL + 'pedidosVentaLineasDetalle/'+detalle.id, detalle).toPromise();
  }

  cancelTicketDetail(detalle: TicketDetalleUpdateDTO): Promise<TicketDetalleDTO|undefined> {
    return this.http.put<TicketDetalleDTO>(APIConstants.API_URL + 'pedidosVentaLineasDetalle/'+detalle.id, detalle).toPromise();
  }

  createTicketDetail(detalle: TicketDetalleDTO): Promise<TicketDetalleDTO|undefined> {
    return this.http.post<TicketDetalleDTO>(APIConstants.API_URL + 'pedidosVentaLineasDetalle', detalle).toPromise();
  }

  deleteTicket(idTicket: string | undefined): Promise<any> {
    return this.http.delete<TicketCabeceraDTO>(APIConstants.API_URL + 'pedidosVentaCabeceras/'+idTicket).toPromise();
  }

  changeStateTicket(ticket: TicketCabeceraCanceladoDTO): Promise<TicketCabeceraDTO|undefined> {
    console.log("SERVICE CANCELAMOS TICKET :: " + ticket.id);
    return this.http.put<TicketCabeceraDTO>(APIConstants.API_URL + 'pedidosVentaCabeceras/'+ticket.id, ticket).toPromise();
  }

  createTickePayment(pago: TicketPagoDTO): Promise<TicketPagoDTO|undefined> {
    return this.http.post<TicketPagoDTO>(APIConstants.API_URL + 'pedidosVentaLineasVencimientos', pago).toPromise();
  }

  updateTickePayment(pago: TicketPagoDTO): Promise<TicketPagoDTO|undefined> {
    return this.http.put<TicketPagoDTO>(APIConstants.API_URL + 'pedidosVentaLineasVencimientos/'+pago.id, pago).toPromise();
  }

  getFormasDePago(): Promise<FormasPagoDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<FormasPagoDTO[]>(APIConstants.API_URL + 'formasPago', {params: params})
      .toPromise();
  }

  
}
