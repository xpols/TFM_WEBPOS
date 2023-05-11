import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { DataPayments } from 'src/app/models/data-payments';
import { FormasPagoDTO } from 'src/app/models/formasPago.dto';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { ObjectComboFamiliasFPDTO } from 'src/app/models/objectComboFamiliasFP.dto';
import { ObjectIDDTO } from 'src/app/models/objectID.dto';
import { TicketFormasPagoDTO } from 'src/app/models/ticketFormasPago.dto';
import { TiendaDTO } from 'src/app/models/tienda.dto';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  formasPago: FormasPagoDTO[] | undefined = [];
  formasPagoTiendaParsed: FormasPagoDTO[] = [];
  formasPagoLV: TicketFormasPagoDTO[] | undefined = [];
  familiasConvertidas: ObjectComboFamiliasFPDTO[] = [];
  ultimaFamiliaSeleccionada: string = '';
  cambio: number = 0.00;

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataPayments,
    private mainSalesService: MainSalesService
  ) {}

  ngOnInit(): void {
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
    }
    this.convertirFPenLV();
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
        familia.importe = '0,00';
        return familia;
      });

      
      /*for(let i = 0; i < this.formasPago.length; i++) {
        let newLV = new TicketFormasPagoDTO(
          '',
          0,//cantidadVale: number;
          null,//codigoVale: string | null;
          null,//comentarios: string | null;
          true,//devuelveCambio: boolean;
          new Date().toLocaleDateString('en-GB'), //fechaVencimiento: Date | string;
          new ObjectComboDTO('','',''), //idDivisa_descripcion: ObjectComboDTO;
          new ObjectIDDTO('1'),//idDivisa: ObjectIDDTO | undefined;
          new ObjectComboDTO('','',''), //idDocumentoComercial_codigo: ObjectComboDTO;
          new ObjectIDDTO('1'),//idDocumentoComercial: ObjectIDDTO | undefined;
          new ObjectComboDTO('','',''), //idFormaPago_descripcion: ObjectComboDTO | undefined;
          new ObjectIDDTO(this.formasPago[i].id),//idFormaPago: ObjectIDDTO | undefined;
          new ObjectComboDTO('','',''), //idTipoVale_descripcion: ObjectComboDTO | undefined;
          undefined, //idTipoVale: ObjectIDDTO | undefined;
          0, //importe: number;
          null, //importeCambioNoDevuelto: number | null;
          null, //importeVale: number | null;
          i, //item: number;
          null, //modoLecturaValeAutomatico: number | null;
          false, //pagadoOnline: boolean | null;
          false, //permitePagoOnline: boolean | null;
          this.formasPago[i].descripcion, // descripcion
          []
        );
        this.formasPagoLV?.push(newLV);
      }*/
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
