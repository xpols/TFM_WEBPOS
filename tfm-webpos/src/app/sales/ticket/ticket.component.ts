import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { TicketCabeceraDTO } from 'src/app/models/ticketCabecera.dto';
import { TicketDetalleDTO } from 'src/app/models/ticketDetalle.dto';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() idTicket: string | undefined;

  ticket: TicketCabeceraDTO | undefined;
  detalles: TicketDetalleDTO[] | undefined;

  constructor(private mainSalesService: MainSalesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["idTicket"].currentValue != changes["idTicket"].previousValue && changes["idTicket"].currentValue.length > 0) {
      console.log("idTicket CHANGE " + changes["idTicket"].currentValue);
      this.loadTicket(this.idTicket);
    }
  }

  private async loadTicket(idTicket: string |undefined): Promise<void> {
    console.log("LOAD TICKET");
    let errorResponse: any;
    try {
      this.ticket = await this.mainSalesService.getTicketCabecera(idTicket);
      console.log("TICKET RECUPERADO :: " + JSON.stringify(this.ticket));
      this.detalles = await this.mainSalesService.getTicketDetalles(idTicket);
      console.log("TICKET DETALLES RECUPERADOS :: " + JSON.stringify(this.detalles));
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

}
