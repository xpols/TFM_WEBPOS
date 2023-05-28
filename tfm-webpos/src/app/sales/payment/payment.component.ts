import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { DataPayments } from 'src/app/models/data-payments';
import { FormasPagoDTO } from 'src/app/models/formasPago.dto';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { ObjectComboFamiliasFPDTO } from 'src/app/models/objectComboFamiliasFP.dto';
import { ObjectIDDTO } from 'src/app/models/objectID.dto';
import { TicketPagoDTO } from 'src/app/models/ticketPago.dto';
import { TiendaDTO } from 'src/app/models/tienda.dto';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  formasPago: FormasPagoDTO[] | undefined = [];
  formasPagoTiendaParsed: FormasPagoDTO[] = [];
  familiasConvertidas: ObjectComboFamiliasFPDTO[] = [];
  ultimaFamiliaSeleccionada: string = '';
  cambio: number = 0.00;

  formasPagoRecibidas: TicketPagoDTO[] = [];

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataPayments,
    private mainSalesService: MainSalesService
  ) {}

  ngOnInit(): void {
    console.log("PAGOS RECIBIDOS :: " + JSON.stringify(this.data.pagos));
    this.formasPagoRecibidas = this.data.pagos;
    this.loadFormasPago();
    
  }

  private async loadFormasPago() {
    this.formasPago = await this.mainSalesService.getFormasDePago();
    let jsonTienda = localStorage.getItem(LocalStorageConstants.TIENDA_DTO);
    if(jsonTienda != null) {
      let formasPagoTienda = JSON.parse(jsonTienda).formasPago;
      for(let i = 0; i < formasPagoTienda.length; i++) {
        let newFormaPago = new FormasPagoDTO(formasPagoTienda[i].id, formasPagoTienda[i].codigo, formasPagoTienda[i].descripcion, formasPagoTienda[i].descripcionAbreviada, formasPagoTienda[i].idFamilia_descripcion);
        this.formasPagoTiendaParsed.push(newFormaPago);
      }
      this.formasPago = this.formasPago?.filter(formaPago => {
        let formaPagoEncontrada = this.formasPagoTiendaParsed.find(formaPagoTienda => formaPagoTienda.id == formaPago.id);
        return formaPagoEncontrada != null && formaPagoEncontrada != undefined;
      });

      if(this.formasPagoRecibidas != undefined && this.formasPagoRecibidas.length > 0) {
        for(let formaPagoRecibida of this.formasPagoRecibidas) {
          if(formaPagoRecibida.idFamiliaFormaPago == undefined || formaPagoRecibida.idFamiliaFormaPago != '') {
            let idFormaPagoBuscada = '';
            if(formaPagoRecibida.idFormaPago_descripcion != undefined && formaPagoRecibida.idFormaPago_descripcion.id != '') {
              idFormaPagoBuscada = formaPagoRecibida.idFormaPago_descripcion.id;
            } else if(formaPagoRecibida.idFormaPago != undefined 
                      && formaPagoRecibida.idFormaPago?.id != undefined 
                      && formaPagoRecibida.idFormaPago?.id != '') {
              idFormaPagoBuscada = formaPagoRecibida.idFormaPago?.id;
            }
            console.log("Buscamos familia para forma de pago :: " + idFormaPagoBuscada);
            let formaPagoencontrada = this.formasPago?.find(formaPago => formaPago.id == idFormaPagoBuscada);
            if(formaPagoencontrada != undefined) {
              console.log("Assignamos familia :: " + formaPagoencontrada.idFamilia_descripcion.id + "  a la forma de pago :: " + formaPagoRecibida.id);
              formaPagoRecibida.idFamiliaFormaPago = formaPagoencontrada.idFamilia_descripcion.id;
            }
          }
        }
      }
    }
    this.convertirFPenLV();
    this.calcularTotales();
  }

  private convertirFPenLV() {
    if(this.formasPago != undefined) {
      let familias = this.formasPago.filter((formaPago, index, array) => {
        return array.findIndex(obj => obj.idFamilia_descripcion?.id === formaPago.idFamilia_descripcion?.id) === index;
      });
      console.log("FAMILIAS FP :: " + JSON.stringify(familias));
      this.familiasConvertidas = familias.map(familia => {
        return familia.idFamilia_descripcion;
      });

      this.familiasConvertidas = this.familiasConvertidas.map(familia => {
        let formasPagoFamilia = this.formasPago?.filter(formaPago => formaPago.idFamilia_descripcion.id == familia.id);
        console.log("FAMILIA :: " + familia.descripcion + " ::: " + formasPagoFamilia);
        familia.formasPago = formasPagoFamilia;
        if(this.formasPagoRecibidas != undefined && this.formasPagoRecibidas.length > 0) {
          console.log("Buscamos familia guardada :: " + JSON.stringify(this.formasPagoRecibidas));
          console.log("familia actual :: " + familia.id);
          let index = this.formasPagoRecibidas.findIndex((pago) => pago.idFamiliaFormaPago == familia.id);
          if (index !== -1 && index != undefined) {
            console.log("familia encontrada en pagos :: " + familia.id);
            familia.importe = this.formasPagoRecibidas[index].importe.toString();
            familia.idLineaGuardada = this.formasPagoRecibidas[index].id;
            console.log("familia encontrada assignamos idLineaGuardada :: " + this.formasPagoRecibidas[index].id);
            let idFormaPagoBuscada = '';
            if(this.formasPagoRecibidas[index].idFormaPago_descripcion != undefined && this.formasPagoRecibidas[index].idFormaPago_descripcion.id != '') {
              idFormaPagoBuscada = this.formasPagoRecibidas[index].idFormaPago_descripcion.id;
            } else if(this.formasPagoRecibidas[index].idFormaPago != undefined && this.formasPagoRecibidas[index].idFormaPago?.id != undefined && this.formasPagoRecibidas[index].idFormaPago?.id != '') {
              idFormaPagoBuscada = this.formasPagoRecibidas[index].idFormaPago?.id;
            }
            console.log("BUSCAMOS FORMA DE PAGO :: " + idFormaPagoBuscada);
            if(familia.formasPago != undefined 
              && familia.formasPago?.length > 0 
              && idFormaPagoBuscada != undefined) {
              let formaPagoencontrada = familia.formasPago.find(familiaFP => familiaFP.id == idFormaPagoBuscada);
              familia.formasPagoSelected = formaPagoencontrada?.id;
            }
          } else {
            familia.importe = '0,00';
            if(familia.formasPago != undefined && familia.formasPago?.length > 0) {
              familia.formasPagoSelected = familia.formasPago[0].id;
            }
          }
        } else {
          familia.importe = '0,00';
          if(familia.formasPago != undefined && familia.formasPago?.length > 0) {
            familia.formasPagoSelected = familia.formasPago[0].id;
          }
        }
        
        
        return familia;
      });
    }    
  } 

  onFocusInput(identificador: string) {
    console.log("FAMILIAS SELECCIONADA :: " + identificador);
    this.ultimaFamiliaSeleccionada = identificador;
  }

  public addNumber(numero: string) {
    this.familiasConvertidas = this.familiasConvertidas.map(familia => {
      if(familia.id == this.ultimaFamiliaSeleccionada) {
        if(familia.importe == '0,00') {
          familia.importe = '';
        }
        if(numero == 'C') {
          familia.importe = '0,00';
        } else {
          familia.importe = familia.importe + numero;
        }
      }
      if(numero != ',') {
        this.calcularTotales();
      }
      return familia
    });
  }

  public duplicateFP(identificadorFP: string) {
    let familiaEncontrada = this.familiasConvertidas.find(familia => familia.id == identificadorFP);
    
    console.log("FAMILIA DUPLICAR :: " + familiaEncontrada);
    if(familiaEncontrada != undefined) {
      let familiaDuplicar = new ObjectComboFamiliasFPDTO(familiaEncontrada.id, familiaEncontrada.codigo, familiaEncontrada?.descripcion);
      familiaDuplicar.formasPago = familiaEncontrada.formasPago;
      let familiaIdMaximo = this.familiasConvertidas.reduce(function(prev, current) {
        return (Number(prev.id) > Number(current.id)) ? prev : current
      });
      console.log("FAMILIA MAXIMO :: " + familiaIdMaximo);
      familiaDuplicar.id = (Number(familiaIdMaximo.id) + 1).toString();
      familiaDuplicar.importe = '0,00';
      console.log("FAMILIA DUPLICAR MODIFICADA :: " + familiaDuplicar);
      let index = this.familiasConvertidas.findIndex(function(familia) {
        console.log("ACTUAL ::" + familia.id + ":: BUSCAMOS ::" + identificadorFP + "::");
        return familia.id == identificadorFP;
      });
      console.log("FAMILIA DUPLICAR POSICION :: " + index);
      if (index !== -1) {
        this.familiasConvertidas.splice(index + 1, 0, familiaDuplicar);
      }
    }
  }

  public removeFP(identificadorFP: string) {
    let familiaEncontradaIndex = this.familiasConvertidas.findIndex(familia => familia.id == identificadorFP);
    if(familiaEncontradaIndex != undefined) {
      this.familiasConvertidas.splice(familiaEncontradaIndex, 1);
      this.calcularTotales();
    }
  }

  private calcularTotales(){
    this.data.totalPagado = this.familiasConvertidas.reduce((a, b) => a + Number(b.importe.replace(",", ".")), 0);
    console.log("TOTAL PAGADO : " + this.data.totalPagado);
    if(this.data.totalPagado - this.data.total > 0) {
      this.cambio = this.data.totalPagado - this.data.total;
    }
  }

  finishPayments():void {
    console.log("FINISH PAYMENTS");
    for (let familiaFormaPago of this.familiasConvertidas) {
      if(Number(familiaFormaPago.importe) > 0) {
        if(familiaFormaPago.idLineaGuardada == undefined) {
          console.log("ADD forma pago a la respuesta :: " + familiaFormaPago.descripcion);
          console.log("forma pago selected :: " + familiaFormaPago.formasPagoSelected);
          let formaPago = new TicketPagoDTO('',
                                            Number(familiaFormaPago.id),
                                            new ObjectComboDTO(familiaFormaPago.id,'',familiaFormaPago.descripcion), //Forma de pago
                                            new ObjectComboDTO('','',''), //Divisa
                                            Number(familiaFormaPago.importe),
                                            new Date().toLocaleDateString('en-GB'), //fechaVencimiento
                                            new ObjectComboDTO('','',''));
          formaPago.idDocumentoComercial = this.data.idDocumentoComercial; 
          formaPago.idDivisa = new ObjectIDDTO('1');
          formaPago.idFamiliaFormaPago = familiaFormaPago.id;
          if(familiaFormaPago.formasPagoSelected != undefined) {
            formaPago.idFormaPago = new ObjectIDDTO(familiaFormaPago.formasPagoSelected);
          }
          this.data.pagos.push(formaPago);
        } else {
          
        }
      }
    }
    this.data.cambio = this.cambio;
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
