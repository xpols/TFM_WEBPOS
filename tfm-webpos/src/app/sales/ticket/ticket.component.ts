import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { ObjectIDDTO } from 'src/app/models/objectID.dto';
import { TicketCabeceraDTO } from 'src/app/models/ticketCabecera.dto';
import { TicketDetalleDTO } from 'src/app/models/ticketDetalle.dto';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { TicketDetalleUpdateDTO } from 'src/app/models/ticketDetalleUpdate.dto';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { productPriceDTO } from 'src/app/models/productPrice.dto';
import { TicketCabeceraCanceladoDTO } from 'src/app/models/ticketCabeceraCancel.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() idTicket: string | undefined;
  @Input() tableName: string | undefined;
  @Input() productoSelecionadoTicket: productPriceDTO = new productPriceDTO(0,'', 0);
  @Output() isLoading = new EventEmitter<boolean>();

  ticket: TicketCabeceraDTO | undefined;
  detalles: TicketDetalleDTO[] | undefined;

  canalVenta: string = 'Terraza'

  constructor(public dialog: MatDialog, private mainSalesService: MainSalesService, private router: Router) { 
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
      this.createTicket();
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

  private async createTicket() {
    this.ticket = await this.mainSalesService.createTicket(this.ticket);
  }

  private addProduct(productPrice: productPriceDTO) {
    this.isLoading.emit(true);
    let idProductReal = productPrice.idProduct?.toString();//idProduct.split("_")[0]
    console.log("AÑADIR PRODUCTO :: " + idProductReal);
    let encontrado = this.detalles?.find( detalle => detalle.idProducto_nombre.id == idProductReal);
    if(encontrado != undefined) {
      this.detalles = this.detalles?.map((detalle) => {
        if(detalle.idProducto_nombre.id == idProductReal) {
          detalle.cantidad++;
          this.updateDetalle(detalle, productPrice);
        }
        return detalle;
      });
    } else {
      console.log("DETALLE NO ENCONTRADO :: CREAMOS NUEVO DETALLE");
      this.createDetalle(productPrice);
    }
    this.isLoading.emit(false);
  }

  private async updateDetalle(detalle: TicketDetalleDTO, productPrice: productPriceDTO) {
    let detalleUpdate = await this.mainSalesService.updateTicketDetail(new TicketDetalleUpdateDTO(detalle.id, detalle.cantidad, detalle.precioUnitarioConImpuestos * detalle.cantidad));
    this.detalles = this.detalles?.map((detalle) => {
      if(detalle.id == detalleUpdate?.id) {
        detalleUpdate = this.assignarDescripcionProducto(detalle.idProducto_nombre.id, productPrice, detalleUpdate);
        return detalleUpdate;
      } else {
        return detalle;
      }
    });
  }

  private async createDetalle(productPrice: productPriceDTO) {
    console.log("CREATE DETALLE :: " + productPrice.idProduct);
    console.log("CREATE DETALLE :: PRECIO :: " + productPrice.precio);
    let newDetalle = new TicketDetalleDTO(
      '',
      '',
      Number(productPrice.precio),
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
      Number(productPrice.precio), //precioUnitarioConImpuestos: number,
      Number(productPrice.precio), //precioUnitarioSinImpuestos: number,
      Number(productPrice.precio), //importeBrutoSinDescuentos: number,
      0, //importeCobrado: number,
      Number(productPrice.precio), //totalConImpuestos: number,
      0
    );

    if(this.ticket != undefined && this.ticket.id != undefined) {
      newDetalle.idDocumentoComercial = new ObjectIDDTO(this.ticket.id);
      let idProducto = '';
      if(productPrice.idProduct != undefined) {
        idProducto = productPrice.idProduct?.toString();
      }
      newDetalle.idProducto = new ObjectIDDTO(idProducto);
      newDetalle.idAlmacen = new ObjectIDDTO('1');
      newDetalle.idEstadoLinea = new ObjectIDDTO('1');
      let detalleCreated = await this.mainSalesService.createTicketDetail(newDetalle);
      if(detalleCreated != undefined) {
        detalleCreated = this.assignarDescripcionProducto(idProducto, productPrice, detalleCreated);
        this.detalles?.push(detalleCreated);
      }
    }
  }

  private async cancelDetalle(detalle: TicketDetalleDTO, productPrice: productPriceDTO) {
    this.isLoading.emit(true);
    let detalleCancelado = new TicketDetalleUpdateDTO(detalle.id, detalle.cantidad, detalle.precioUnitarioConImpuestos * detalle.cantidad);
    detalleCancelado.idEstadoLinea = new ObjectIDDTO('2');
    let cancelUpdate = await this.mainSalesService.cancelTicketDetail(detalleCancelado);

    let index = this.detalles?.findIndex((detalleFind) => detalleFind.id == detalle.id);
    if (index !== -1 && index != undefined) {
      this.detalles?.splice(index, 1);
    }
    this.isLoading.emit(false);
  }

  private assignarDescripcionProducto(idProducto: string, productPrice: productPriceDTO, detalleCreated: TicketDetalleDTO): TicketDetalleDTO {
    let productoDescripcion = '';
        if(productPrice.descripcion != undefined) {
          productoDescripcion = productPrice.descripcion;
        }
        detalleCreated.idProducto_nombre = new ObjectComboDTO(idProducto,'',productoDescripcion);
        return detalleCreated;
  }

  recibirProductoModificado(productModify: productPriceDTO) {
    this.isLoading.emit(true);
    let detalle = this.detalles?.find(detalle => detalle.id == productModify.idDetalle);
    if(detalle != undefined) {
      if(productModify.accion == LocalStorageConstants.ACTION_PLUS) {
        detalle.cantidad++;
        this.updateDetalle(detalle, productModify);
      } else if(productModify.accion == LocalStorageConstants.ACTION_MINUS) {
        detalle.cantidad--;
        this.updateDetalle(detalle, productModify);
      } else if(productModify.accion == LocalStorageConstants.ACTION_DELETE) {
        this.cancelDetalle(detalle, productModify);
      }
    } else {
      console.log("Detalle no encontrado");
    }
    this.isLoading.emit(false);
  }

  openPaymentsDialog(): void {
    console.log("Open payment dialag :: " + this.ticket?.totalConImpuestos);
    const dialogRef = this.dialog.open(PaymentComponent, {
      data: {total: this.ticket?.totalConImpuestos, totalPagado: 0},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed :: ' + result);
      /*if(result != undefined) {
        this.numDiners = result;
        this.router.navigate(['/sales'], {queryParams: {tableTicketId: null, numDiners: this.numDiners, tableName: this.tableName, tableId: this.tableId }});
      } */
    });
  }

  public async cancelarTicket():Promise<void> {
    if(this.ticket?.id != undefined) {
      console.log("Cancelamos ticket :: " + this.ticket.id);
      let ticketCancelado = new TicketCabeceraCanceladoDTO(this.ticket.id);
      this.ticket = await this.mainSalesService.cancelTicket(ticketCancelado);
      this.router.navigate(['/tables']).then(_ => console.log('Ticket canceled finish'));
    }
  }

}
