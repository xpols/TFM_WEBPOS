import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { DataPrint } from 'src/app/models/data-print';

import html2canvas from 'html2canvas';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ticket-print',
  templateUrl: './ticket-print.component.html',
  styleUrls: ['./ticket-print.component.scss']
})
export class TicketPrintComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TicketPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataPrint,
    private mainSalesService: MainSalesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  }

  public enviarCorreo() {
    /*this.mailgun.enviarCorreo('xpol44@gmail.com', 'Asunto del correo', 'Contenido del correo').then((response: any) => {
      console.log(response);
    });*/
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
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
