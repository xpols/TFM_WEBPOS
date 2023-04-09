import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstants } from '../constants/constants';
import { UbicacionesDTO } from '../models/ubicaciones.dto';
import { UbicacionDTO } from '../models/ubicacion.dto';
import { ConfigProductosDTO } from '../models/configProductos.dto';
import { CategoriasDTO } from '../models/categorias.dto';

@Injectable({
  providedIn: 'root'
})
export class MainSalesService {

  constructor(private http: HttpClient) { }

  getUbicaciones(codigoTienda: string | null): Promise<UbicacionesDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('filters', '[{"field":"idTipoAgrupacion.codigo","type":"codigo","op":"equals","listValues":[{"value":"002"}]}]');
    params = params.append('filtersHijos', '[{"field":"tiendas.codigo","type":"codigo","op":"equals","listValues":[{"value":"999"}]}]');
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
}