import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { ObjectIDDTO } from 'src/app/models/objectID.dto';
import { TicketCabeceraDTO } from 'src/app/models/ticketCabecera.dto';
import { TicketDetalleDTO } from 'src/app/models/ticketDetalle.dto';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { TicketDetalleUpdateDTO } from 'src/app/models/ticketDetalleUpdate.dto';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';


@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() idTicket: string | undefined;
  @Input() tableName: string | undefined;
  @Input() productoSelecionadoTicket: any;

  ticket: TicketCabeceraDTO | undefined;
  detalles: TicketDetalleDTO[] | undefined;

  canalVenta: string = 'Terraza'

  constructor(public dialog: MatDialog, private mainSalesService: MainSalesService) { 
    this.ticket = new TicketCabeceraDTO(
      '',
      '',
      0,
      new Date().toLocaleDateString('en-GB'),
      new Date().toLocaleDateString('en-GB'),
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
      '',
      new Date().toLocaleDateString('en-GB'),
      new Date().toLocaleDateString('en-GB'),
      0,
      0,
      false,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      '',
      0,
      new ObjectComboDTO('','',''),
      0,
      0,
      new ObjectComboDTO('','',''),
    );
  }

  ngOnInit(): void {
    if((this.idTicket == undefined || this.idTicket == '') &&  this.ticket != undefined && this.ticket.id == '') {
      this.ticket.codigo = this.tableName + "-" + new Date().getTime();
      let idCanalLS = localStorage.getItem(LocalStorageConstants.ID_CANAL_VENTA);
      this.ticket.idCanalVenta = new ObjectIDDTO(idCanalLS != null ? idCanalLS : '');
      this.ticket.idDivisa = new ObjectIDDTO('1');
      let idTPVLS = localStorage.getItem(LocalStorageConstants.ID_TPV);
      this.ticket.idTPV = new ObjectIDDTO(idTPVLS != null ? idTPVLS : '');
      let idTiendaLS = localStorage.getItem(LocalStorageConstants.ID_TIENDA);
      this.ticket.idTienda = new ObjectIDDTO(idTiendaLS != null ? idTiendaLS : '');
      this.ticket.numeroComensales = 0;
      let idDominioLS = localStorage.getItem(LocalStorageConstants.DOMINIO_USUARIO);
      this.ticket.idDominio = new ObjectIDDTO(idDominioLS != null ? idDominioLS : '');
      console.log("DEBEMOS CREAR UN TICKET NUEVO");
      this.mainSalesService.createTicket(this.ticket);
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log("productoSelecionadoTicket CHANGE 11111" + changes["productoSelecionadoTicket"].currentValue);
    if(changes["productoSelecionadoTicket"].currentValue != undefined && changes["productoSelecionadoTicket"].currentValue != 0) {
      console.log("productoSelecionadoTicket CHANGE " + changes["productoSelecionadoTicket"].currentValue);
      this.addProduct(changes["productoSelecionadoTicket"].currentValue);
    }

    if(changes["idTicket"] != undefined) {
      if(changes["idTicket"].currentValue != changes["idTicket"].previousValue && changes["idTicket"].currentValue.length > 0) {
        console.log("idTicket CHANGE " + changes["idTicket"].currentValue);
        this.loadTicket(this.idTicket);
      }
    }
    
    if(changes["tableName"] != undefined) {
      if(changes["tableName"].currentValue != changes["tableName"].previousValue && changes["tableName"].currentValue.length > 0) {
        console.log("tableName CHANGE " + changes["tableName"].currentValue);
        if(this.tableName != undefined && this.ticket != undefined) {
          console.log("Assignamos mesa");
          this.ticket.mesa = this.tableName;
        }
      }
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

  private addProduct(idProduct: string) {
    let idProductReal = idProduct.split("_")[0]
    console.log("AÑADIR PRODUCTO :: " + idProductReal);
    let encontrado = this.detalles?.find( detalle => detalle.idProducto_nombre.id == idProductReal);
    if(encontrado != undefined) {
      this.detalles = this.detalles?.map((detalle) => {
        if(detalle.idProducto_nombre.id == idProductReal) {
          detalle.cantidad++;
          this.updateDetalle(detalle);
        }
        return detalle;
      });
    } else {
      console.log("DETALLE NO ENCONTRADO :: CREAMOS NUEVO DETALLE");
      this.createDetalle(idProductReal);
    }
  }

  private async updateDetalle(detalle: TicketDetalleDTO) {
    console.log("UPDATE DETALLE :: " + detalle.idProducto_nombre.id);
    console.log("UPDATE DETALLE CANTIDAD :: " + detalle.cantidad);
    let detalleUpdate = await this.mainSalesService.updateTicketDetail(new TicketDetalleUpdateDTO(detalle.id, detalle.cantidad));
    this.detalles = this.detalles?.map((detalle) => {
      if(detalle.id == detalleUpdate?.id) {
        return detalleUpdate;
      } else {
        return detalle;
      }
    });
  }

  private async createDetalle(idProduct: string) {
    console.log("CREATE DETALLE :: " + idProduct);
    let newDetalle = new TicketDetalleDTO(
      '',
      '',
      5.55,
      1,
      new Date().toLocaleDateString('en-GB'),
      null,
      null,
      null,
      new Date().toLocaleDateString('en-GB'),
      null,
      new ObjectComboDTO('','',''), //idAlmacen_descripcion: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idDocumentoComercial_codigo: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idEleccionProducto_id: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idLineaPadre_item: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idPersonal_nombre: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idProducto_codigo: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idProducto_nombre: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idPromocion_descripcion: ObjectComboDTO,
      new ObjectComboDTO('','',''), //idUnidadMedidaVenta_descripcion: ObjectComboDTO,
      5.55, //precioUnitarioConImpuestos: number,
      5.55, //precioUnitarioSinImpuestos: number,
      5.55, //importeBrutoSinDescuentos: number,
      5.55, //importeCobrado: number,
      5.55, //totalConImpuestos: number,
      0
    );

    if(this.ticket != undefined && this.ticket.id != undefined) {
      newDetalle.idDocumentoComercial = new ObjectIDDTO(this.ticket.id);
      newDetalle.idProducto = new ObjectIDDTO(idProduct);
      newDetalle.idAlmacen = new ObjectIDDTO('1');
      newDetalle.idEstadoLinea = new ObjectIDDTO('1');
      let detalleCreated = await this.mainSalesService.createTicketDetail(newDetalle);
      if(detalleCreated != undefined) {
        this.detalles?.push(detalleCreated);
      }
    }

  }

  openPaymentsDialog(): void {
    const dialogRef = this.dialog.open(PaymentComponent, {
      data: {total: this.ticket?.totalConImpuestos},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed :: ' + result);
      /*if(result != undefined) {
        this.numDiners = result;
        this.router.navigate(['/sales'], {queryParams: {tableTicketId: null, numDiners: this.numDiners, tableName: this.tableName, tableId: this.tableId }});
      } */
    });
  }

}
