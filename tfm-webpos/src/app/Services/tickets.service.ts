import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstants } from '../constants/constants';
import { TicketCabeceraDTO } from '../models/ticketCabecera.dto';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  getTicket(idTienda: string | null, idTPV: string | null, fecha: string): Promise<TicketCabeceraDTO[]|undefined> {
    let params = new HttpParams();
    params = params.append('grupoTiendaSeleccionada', 'T'+idTienda);
    params = params.append('fecha', fecha);
    params = params.append('contador', true);
    params = params.append('filters', '[{"field":"idTPV.id","type":"numeric","op":"equals","listValues":[{"value":"'+idTPV+'"}]}]');
    params = params.append('max', 1000);
    params = params.append('offset', 0);
    return this.http
      .get<TicketCabeceraDTO[]>(APIConstants.API_URL + 'pedidosVentaCabeceras', {params: params})
      .toPromise();
  }
}
