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

  sendEmail2(to: string, subject: string, text: string) {

    let apiUrl = 'https://api.mailgun.net/v3/sandbox1cd5b3bd1e9a413a9977abaa35413bc7.mailgun.org';
    let apiKey = '74fdde4106f3ead5a7ea3ea256ba7e6b-6b161b0a-12b56b4b';

    const formData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('text', text);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    return this.http.post(apiUrl, formData, {
      headers: {
        Authorization: "Basic ${btoa('api:74fdde4106f3ead5a7ea3ea256ba7e6b-6b161b0a-12b56b4b')}"
      }
    });
  }

  sendMail(): void {
    console.log("SEND MAIL");
    const componente = document.querySelector('#ticket-print-container') as HTMLElement;
    if(componente != null && componente!= undefined) {
      console.log("Existe Componente");
      html2canvas(componente).then(canvas => {
        // Convierte la imagen a un archivo PNG en base64
        const imagen = canvas.toDataURL('image/png').split(',')[1];

        this.sendEmail2('xpol44@gmail.com', 'TEST MAILGUN' , 'TEXTO TEST').subscribe(
          response => console.log(response),
          error => console.error(error)
        );

        /*const servicioCorreo = emailjs.init('TU_SERVICIO_CORREO');
        // Envía el correo electrónico utilizando emailjs
        emailjs.send("service_3s6uaqr","template_cx00h38",{
          from_name: "Restaurante",
          message: "MSG",
          email_to: "x.pol@nextt.es",
        }).then(() => {
          console.log('Correo electrónico enviado');
        }, error => {
          console.error('Error al enviar correo electrónico:', error);
        });*/

        //const servicioCorreo = emailjs.init('TU_SERVICIO_CORREO');
        /*servicioCorreo.send('TU_PLANTILLA_CORREO', {
          imagen: imagen
        }).then(() => {
          console.log('Correo electrónico enviado');
        }, error => {
          console.error('Error al enviar correo electrónico:', error);
        });*/
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
