import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { TiendaDTO } from '../models/tienda.dto';
import { TpvDTO } from '../models/tpv.dto';

const API_URL = 'https://nextt1.pre-api.nexttdirector.net:8443/NexttDirector_NexttApi/';
//const API_URL = 'http://nextt1.pre-api.nexttdirector.net:8080/NexttDirector_NexttApi/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const ID_TIENDA = 'id_tienda';
const ID_TPV = 'id_tpv';

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
      .get<TiendaDTO[]>(API_URL + 'tiendas')
      .toPromise();
  }



  getTPVs(idTienda: String): Promise<TpvDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'T'+idTienda);
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<TpvDTO[]>(API_URL + 'tpvs', {params: params})
      .toPromise();
  }

  saveConfig(idTienda: string, idTPV: string): void {
    localStorage.setItem(ID_TIENDA, idTienda);
    localStorage.setItem(ID_TPV, idTPV);
  }
}
