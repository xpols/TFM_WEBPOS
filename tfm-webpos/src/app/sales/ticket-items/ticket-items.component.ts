import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { productPriceDTO } from 'src/app/models/productPrice.dto';
import { TicketDetalleDTO } from 'src/app/models/ticketDetalle.dto';

@Component({
  selector: 'ticket-items',
  templateUrl: './ticket-items.component.html',
  styleUrls: ['./ticket-items.component.scss']
})
export class TicketItemsComponent implements OnInit {

  @Input() detalle: TicketDetalleDTO;
  @Input() imagenProducto: string = 'NOT_FIND';
  @Output() productoModificado = new EventEmitter<productPriceDTO>();

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

  plus() {
    let accionSumar = new productPriceDTO(Number(this.detalle.idProducto_nombre.id), this.detalle.idProducto_nombre.descripcion, this.detalle.totalConImpuestos);
    accionSumar.idDetalle = this.detalle.id;
    accionSumar.accion = LocalStorageConstants.ACTION_PLUS;
    this.productoModificado.emit(accionSumar);
  }

  minus() {
    let accionRestar = new productPriceDTO(Number(this.detalle.idProducto_nombre.id), this.detalle.idProducto_nombre.descripcion, this.detalle.totalConImpuestos);
    accionRestar.idDetalle = this.detalle.id;
    if(this.detalle.cantidad > 1) {
      accionRestar.accion = LocalStorageConstants.ACTION_MINUS;
    } else {
      accionRestar.accion = LocalStorageConstants.ACTION_DELETE;
    }
    this.productoModificado.emit(accionRestar);
  }

}
