import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { TiendaDTO } from '../models/tienda.dto';
import { TpvDTO } from '../models/tpv.dto';
import { APIConstants, LocalStorageConstants } from '../constants/constants';
import { CanalesVentaDTO } from '../models/canalesVenta.dto';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getTiendas(): Promise<TiendaDTO[]|undefined> {
    return this.http
      .get<TiendaDTO[]>(APIConstants.API_URL + 'tiendas')
      .toPromise();
  }

  getTienda(idTienda: string): Promise<TiendaDTO|undefined> {
    return this.http
      .get<TiendaDTO>(APIConstants.API_URL + 'tiendas/'+idTienda)
      .toPromise();
  }



  getTPVs(idTienda: String): Promise<TpvDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'T'+idTienda);
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<TpvDTO[]>(APIConstants.API_URL + 'tpvs', {params: params})
      .toPromise();
  }

  getCanalesVenta(): Promise<CanalesVentaDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<CanalesVentaDTO[]>(APIConstants.API_URL + 'canalesVenta', {params: params})
      .toPromise();
  }

  saveConfig(idTienda: string, idTPV: string, codigoTienda: string | undefined, idCanalVenta: string): void {
    localStorage.setItem(LocalStorageConstants.ID_TIENDA, idTienda);
    if(codigoTienda != undefined) {
      localStorage.setItem(LocalStorageConstants.CODIGO_TIENDA, codigoTienda);
    }
    localStorage.setItem(LocalStorageConstants.ID_TPV, idTPV);
    localStorage.setItem(LocalStorageConstants.ID_CANAL_VENTA, idCanalVenta);
  }

  saveInfoComplementaria(tiendaActual: TiendaDTO | undefined, canalesVenta: CanalesVentaDTO[] | undefined): void {
    console.log("TIENDA ACTUAL :: TO STRING :: " + JSON.stringify(tiendaActual));
    if(tiendaActual != undefined) {
      localStorage.setItem(LocalStorageConstants.TIENDA_DTO, JSON.stringify(tiendaActual));
    }
    console.log("CANALES VENTA :: TO STRING :: " + JSON.stringify(canalesVenta));
    if(canalesVenta != undefined) {
      localStorage.setItem(LocalStorageConstants.CANALES_VENTA_DTO_ARRAY, JSON.stringify(canalesVenta));
    }
  }
}
