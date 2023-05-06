import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstants } from '../constants/constants';
import { TpvDTO } from '../models/tpv.dto';
import { ZonaMesasDTO } from '../models/zonamesas.dto';
import { MesaDTO } from '../models/mesa.dto';

@Injectable({
  providedIn: 'root'
})
export class ZonaMesasService {

  constructor(private http: HttpClient) { }

  getZonasMesas(idTienda: String | null): Promise<ZonaMesasDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'T'+idTienda);
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    params = params.append('orders:', '[{"order":[{"field":"codigo","value":"asc"}]}]');
    return this.http
      .get<ZonaMesasDTO[]>(APIConstants.API_URL + 'zonasDeMesas', {params: params})
      .toPromise();
  }

  getMesas(idZona: String | null): Promise<MesaDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('filters', '[{"field":"idObjeto.idTipoObjeto.id","type":"numeric","op":"equals","listValues":[{"value":"2"}]}]');
    params = params.append('filtrosComplementarios', '[{"field":"idZona.id","type":"numeric","op":"equals","listValues":[{"value":'+idZona+'}]}]');
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    params = params.append('orders:', '[{"order":[{"field":"codigo","value":"asc"}]}]');
    return this.http
      .get<MesaDTO[]>(APIConstants.API_URL + 'objetosEnZona', {params: params})
      .toPromise();
  }

  getTicketAbiertos(idTPV: String | null): Promise<any[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'A');
    params = params.append('filters', '[{"field":"idEstadoDocumento.id","type":"numeric","op":"equals","listValues":[{"value":"1"}]}, {"field":"idTPV.id","type":"numeric","op":"equals","listValues":[{"value":"'+idTPV+'"}]}]');
    params = params.append('option','fields');
    params = params.append('fields', 'id,mesa');
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<any[]>(APIConstants.API_URL + 'pedidosVentaCabeceras', {params: params})
      .toPromise();
  }

  
  
}
