import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { TiendaDTO } from '../models/tienda.dto';
import { TpvDTO } from '../models/tpv.dto';
import { APIConstants, LocalStorageConstants } from '../constants/constants';

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



  getTPVs(idTienda: String): Promise<TpvDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'T'+idTienda);
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<TpvDTO[]>(APIConstants.API_URL + 'tpvs', {params: params})
      .toPromise();
  }

  saveConfig(idTienda: string, idTPV: string, codigoTienda: string | undefined): void {
    localStorage.setItem(LocalStorageConstants.ID_TIENDA, idTienda);
    if(codigoTienda != undefined) {
      localStorage.setItem(LocalStorageConstants.CODIGO_TIENDA, codigoTienda);
    }
    localStorage.setItem(LocalStorageConstants.ID_TPV, idTPV);
  }
}
