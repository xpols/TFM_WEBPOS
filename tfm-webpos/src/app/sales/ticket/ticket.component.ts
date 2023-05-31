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
import { SharedService } from 'src/app/Services/shared.service';
import { TicketPagoDTO } from 'src/app/models/ticketPago.dto';
import { TicketPrintComponent } from '../ticket-print/ticket-print.component';
import { EleccionesProductoDTO } from 'src/app/models/eleccionesProducto.dto';
import { AssociatedProductsComponent } from '../associated-products/associated-products.component';


@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() idTicket: string | undefined;
  @Input() tableName: string | undefined;
  @Input() numDiners: number = 0;
  @Input() productoSelecionadoTicket: productPriceDTO = new productPriceDTO(0,'', 0);
  @Output() isLoading = new EventEmitter<boolean>();

  ticket: TicketCabeceraDTO | undefined;
  detalles: TicketDetalleDTO[] | undefined = [];
  pagos: TicketPagoDTO[] | undefined = [];
  totalPagado: number = 0;
  cambio: number = 0;
  
  canalVenta: string = 'Terraza'

  grupos: EleccionesProductoDTO[] = [];

  constructor(public dialog: MatDialog, private mainSalesService: MainSalesService, private router: Router, private sharedService: SharedService) { 
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
    console.log("HORA TICKET :: " + this.ticket.fechaHora);
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
    console.log(currentTime);
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
      this.loadCanalCurrent();
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

    if(changes["numDiners"] != undefined) {
      if(changes["numDiners"].currentValue != changes["numDiners"].previousValue && changes["numDiners"].currentValue.length > 0) {
        console.log("numDiners CHANGE " + changes["numDiners"].currentValue);
        if(this.numDiners != undefined && changes["numDiners"].currentValue != undefined) {
          console.log("Assignamos numDiners");
          this.numDiners = changes["numDiners"].currentValue;
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
      this.pagos = await this.mainSalesService.getTicketPagos(idTicket);
      console.log("TICKET PAGOS RECUPERADOS :: " + JSON.stringify(this.pagos));
      if(this.ticket?.numeroComensales != undefined) {
        this.sharedService.setNumDiners(this.ticket?.numeroComensales);
      }
      this.loadCanalCurrent();
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private async getTotales(idTicket: string |undefined): Promise<void> {
    console.log("GET TOTALES TICKET");
    let errorResponse: any;
    try {
      let totalConImpuestos = this.detalles?.reduce((a, b) => a + b.totalConImpuestos, 0);
      if(this.ticket != undefined && totalConImpuestos != undefined) {
        this.ticket.totalConImpuestos = totalConImpuestos;
        this.ticket.totalBruto = totalConImpuestos;
        this.ticket = await this.mainSalesService.updateTicketCabecera(this.ticket);
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private loadCanalCurrent() {
    let canalesArray = localStorage.getItem(LocalStorageConstants.CANALES_VENTA_DTO_ARRAY);
    let canalId = localStorage.getItem(LocalStorageConstants.ID_CANAL_VENTA);
    if(this.ticket?.idCanalVenta != undefined) {
      canalId = this.ticket?.idCanalVenta.id;
    }
    if(canalesArray != undefined) {
      let canalesArrayParsed = JSON.parse(canalesArray);
      for (let canal of canalesArrayParsed) {
        if(canal.id == canalId) {
          this.canalVenta = canal.descripcion;
        }
      }
    }
    
  }

  private async createTicket() {
    if(this.ticket != undefined) {
      this.ticket.numeroComensales = this.numDiners;
      //console.log("HORA TICKET :: " + this.ticket.fechaHora);
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
      console.log(currentTime);
      this.ticket.fechaHora += ' ' + currentTime;
      this.ticket.horaInicioCreacionDocumento += ' ' + currentTime;
      this.ticket.horaFinCreacionDocumento = undefined;
      this.ticket = await this.mainSalesService.createTicket(this.ticket);
    }
  }

  

  private async addProduct(productPrice: productPriceDTO) {
    let idProductReal = productPrice.idProduct?.toString();//idProduct.split("_")[0]
    console.log("AÑADIR PRODUCTO :: " + idProductReal);
    if(idProductReal != undefined) {
      await this.isProductWithGroups(idProductReal);
      console.log("Productos con associados recuperados");
      if(this.grupos.length > 0) {
        console.log("GRUPOS > 0");
        this.openAssociatedProductDialog();
      } else {
        this.isLoading.emit(true);
        console.log("GRUPOS = 0");
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
    if(this.ticket != undefined) {
      this.getTotales(this.ticket.id);
    }
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

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
    newDetalle.fechaHoraSeleccionado += ' ' + currentTime;

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
      this.getTotales(this.ticket.id);
    }
  }

  private async isProductWithGroups(idProducto: string) {
    let elecciones = await this.mainSalesService.getEleccionesProducto(idProducto);
    console.log("ELECCIONES :: " + JSON.stringify(elecciones));
    elecciones?.sort(function (a, b) {
      if (a.orden < b.orden)
          return -1;
      else if (a.orden > b.orden)
          return 1;
      else 
          return 0;
    });
    if(elecciones != undefined) {
      const idsElecciones = elecciones.reduce((acumulador, eleccion, index) => {
        if (index === 0) {
          return eleccion.id;
        } else {
          return acumulador + ', ' + eleccion.id;
        }
      }, '');
      let selecciones = await this.mainSalesService.getSeleccionesProducto(idsElecciones);
      console.log("SELECCIONES :: " + JSON.stringify(selecciones));

      let existenSelecciones = false;
      elecciones = elecciones?.map((eleccion) => {
        let seleccionesGrupo = selecciones?.filter(seleccion => seleccion.idEleccionProducto_idNombreEleccionProducto_nombre.toString() === eleccion.id.toString());
        if(seleccionesGrupo != undefined) {
          seleccionesGrupo?.sort(function (a, b) {
            if (a.orden < b.orden)
                return -1;
            else if (a.orden > b.orden)
                return 1;
            else 
                return 0;
          });
          eleccion.selecciones = seleccionesGrupo;
          if(eleccion.minProdAElegir == 0) {
            eleccion.grupoCompleto = true;
          }
          if(seleccionesGrupo?.length > 0) {
            existenSelecciones = true;
          }
        }
        
        return eleccion;
      });

      console.log("ELECCIONES CON PRODUCTOS :: " + JSON.stringify(elecciones));

      this.grupos = elecciones;
      if(!existenSelecciones) {
        this.grupos = [];
      }
    }

  }

  openAssociatedProductDialog(): void {
    console.log("Open associated product dialog :: " + this.grupos);
    const dialogRef = this.dialog.open(AssociatedProductsComponent, {
      data: {
          grupos: this.grupos
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('associated product dialog was closed :: ' + JSON.stringify(result));
    });
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
    if(this.ticket != undefined) {
      this.getTotales(this.ticket.id);
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
    if(this.ticket != undefined) {
      const dialogRef = this.dialog.open(PaymentComponent, {
        data: {
          total: this.ticket?.totalConImpuestos, 
          totalPagado: 0,
          cambio: 0,
          pagos: this.pagos,
          idDocumentoComercial: new ObjectIDDTO(this.ticket.id)
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Payment dialog was closed :: ' + JSON.stringify(result));
        this.pagos = result.pagos;
        this.cambio = result.cambio;
        this.totalPagado = result.totalPagado;
        this.processPayments();
        if(this.ticket != undefined) {
          if(result.totalPagado >= this.ticket?.totalConImpuestos) {
            this.finishTicket();
          }
        }
      });
    }
  }

  private async processPayments() {
    if(this.pagos != undefined) {
      let pagosCopy = [...this.pagos];
      for(let payment of this.pagos) {
        console.log("Procesamos pago id :: " + payment.id);
        console.log("Procesamos pago importe :: " + payment.importe);
        if(payment.id != '') {
          console.log("UPDATE PAYMENT");
          let paymentSave = await this.mainSalesService.updateTickePayment(payment);
          let index = pagosCopy.findIndex((pago) => pago.id == payment.id);
          if (index !== -1 && index != undefined) {
            pagosCopy?.splice(index, 1);
            if(paymentSave != undefined) {
              console.log("Payment modify in pagos");
              pagosCopy.push(paymentSave);
            }
          }
        } else {
          console.log("CREATE PAYMENT");
          let paymentSave = await this.mainSalesService.createTickePayment(payment);
          if(paymentSave != undefined) {
            console.log("Payment add to pagos :: " + paymentSave.id);
            pagosCopy.push(paymentSave);
          }
        }
      }

      pagosCopy = pagosCopy.filter((payment) => payment.id != '' && payment.id != undefined);

      this.pagos = pagosCopy;
      console.log("PAGOS TRAS PAYMENT :: " + JSON.stringify(this.pagos));
      console.log("PAGOS TRAS PAYMENT LENGTH:: " + this.pagos.length);
    }
  }

  private async finishTicket() {
    if(this.ticket != undefined) {
      let ticketPagado = new TicketCabeceraCanceladoDTO(this.ticket.id);
      ticketPagado.idEstadoDocumento = new ObjectIDDTO('11');
      //this.ticket = await this.mainSalesService.changeStateTicket(ticketPagado);
      this.openPrintDialog();
      //this.router.navigate(['/tables']).then(_ => console.log('Ticket canceled finish'));
    }
  }

  openPrintDialog(): void {
    console.log("Open print dialag :: " + this.ticket?.totalConImpuestos);
    if(this.ticket != undefined) {
      const dialogRef = this.dialog.open(TicketPrintComponent, {
        data: {
          ticket: this.ticket,
          detalles: this.detalles,
          pagos: this.pagos,
          cambio: this.cambio,
          totalPagado: this.totalPagado
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Print dialog was closed :: ' + JSON.stringify(result));
        this.closeTicket();
      });
    }
  }

  private async closeTicket() {
    if(this.ticket != undefined) {
      let ticketPagado = new TicketCabeceraCanceladoDTO(this.ticket.id);
      ticketPagado.idEstadoDocumento = new ObjectIDDTO('11');
      this.ticket = await this.mainSalesService.changeStateTicket(ticketPagado);
      this.router.navigate(['/tables']).then(_ => console.log('Ticket canceled finish'));
    }
  }

  public async cancelarTicket():Promise<void> {
    if(this.ticket?.id != undefined) {
      console.log("Cancelamos ticket :: " + this.ticket.id);
      let ticketCancelado = new TicketCabeceraCanceladoDTO(this.ticket.id);
      this.ticket = await this.mainSalesService.changeStateTicket(ticketCancelado);
      this.router.navigate(['/tables']).then(_ => console.log('Ticket canceled finish'));
    }
  }

  public async sendTable() {
    if(this.ticket != undefined) {
      //this.ticket = await this.mainSalesService.updateTicketCabecera(this.ticket);
      this.router.navigate(['/tables']).then(_ => console.log('Ticket canceled finish'));
    }
  }

}
