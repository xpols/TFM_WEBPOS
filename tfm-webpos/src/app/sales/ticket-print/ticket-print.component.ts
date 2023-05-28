import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { DataPrint } from 'src/app/models/data-print';

import html2canvas from 'html2canvas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { ConfigTextosAgrupacionDTO } from 'src/app/models/configTextosAgrupacion.dto';
import { ConfigTextosDTO } from 'src/app/models/configTextos.dto';
import { PrintTicketDTO } from 'src/app/models/printTicket.dto';

@Component({
  selector: 'ticket-print',
  templateUrl: './ticket-print.component.html',
  styleUrls: ['./ticket-print.component.scss']
})
export class TicketPrintComponent implements OnInit {

  configuracionTextos: ConfigTextosDTO | undefined;
  fechaTicket: string | undefined;
  horaTicket: string | undefined;
  emailValue: string = '';
  sendMailActive: boolean = true;
  emailTouched: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TicketPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataPrint,
    private mainSalesService: MainSalesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadConfiguraciones();
    let fechaHoraPartes = this.data.ticket?.fechaHora.toString().split(" ");
    if(fechaHoraPartes != null && fechaHoraPartes[0] != null && fechaHoraPartes[1] != null) {
      this.fechaTicket = fechaHoraPartes[0];
      this.horaTicket = fechaHoraPartes[1];
    }
    console.log("PAGOS :: " + JSON.stringify(this.data.pagos));
  }

  private async loadConfiguraciones(): Promise<void> {
    let configuraciones = await this.mainSalesService.getConfiguracionesTextos(localStorage.getItem(LocalStorageConstants.CODIGO_TIENDA));
    if(configuraciones != null && configuraciones[0] != null) {
      this.configuracionTextos = configuraciones[0].idConfigTicket;
    }
  }

  onEmailChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement);
    console.log("MAIL VALID :: " + inputElement.validity.patternMismatch);
    this.sendMailActive = inputElement.validity.patternMismatch;
  }

  onEmailBlur() {
    if (this.emailValue === '') {
      this.emailTouched = true;
    }
  }


  public enviarCorreo(imagenBase64: string) {
    this.mainSalesService.sendTicketEmail(new PrintTicketDTO(this.emailValue, imagenBase64, this.data.ticket?.codigo));
    this.dialogRef.close();
  }


  sendMail(): void {
    console.log("SEND MAIL");
    const componente = document.querySelector('#ticket-print-container') as HTMLElement;
    if(componente != null && componente!= undefined) {
      console.log("Existe Componente");
      html2canvas(componente).then(canvas => {
        // Convierte la imagen a un archivo PNG en base64
        const imagen = canvas.toDataURL('image/png').split(',')[1];
        console.log("IMAGEN BASE 64 :: " + imagen);
        this.enviarCorreo(imagen);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
