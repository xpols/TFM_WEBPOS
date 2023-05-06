import { Component, Input, OnInit } from '@angular/core';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { TicketDetalleDTO } from 'src/app/models/ticketDetalle.dto';

@Component({
  selector: 'ticket-items',
  templateUrl: './ticket-items.component.html',
  styleUrls: ['./ticket-items.component.scss']
})
export class TicketItemsComponent implements OnInit {

  @Input() detalle: TicketDetalleDTO;

  constructor() { 
    this.detalle = new TicketDetalleDTO('',
      '',
      0,
      0,
      new Date(),
      null,
      null,
      null,
      null,
      null,
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      new ObjectComboDTO('','',''),
      0,
      0,
      0,
      0,
      0,
      0);
  }

  ngOnInit(): void {

  }

  plus() {}

  minus() {}

}
