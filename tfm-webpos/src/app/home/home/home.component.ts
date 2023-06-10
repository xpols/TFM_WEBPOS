import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { TicketsService } from 'src/app/Services/tickets.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  hoy: string | null = null;
  hoyM1: string | null = null;
  hoyM2: string | null = null;
  hoyM3: string | null = null;
  hoyM4: string | null = null;
  hoyM5: string | null = null;
  hoyM6: string | null = null;
  isLoadingResults = false;
  dataG1: any[] = [];
  categoriesG1: any[] = [];
  dataG2: any[] = [];
  dataG3: any[] = [];

  constructor(private datePipe: DatePipe, private ticketsService: TicketsService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.setTableName(undefined);
    this.sharedService.setNumDiners(0);
    this.initGraficos();
  }

  async initGraficos(): Promise<void> {
    this.dataG1 = [];
    this.dataG2 = [];
    this.dataG3 = [];
    this.categoriesG1 = [];
    this.hoyM6 = this.getFechaAnterior(6);
    this.categoriesG1.push(this.hoyM6);
    await this.loadTickets(this.hoyM6);
    this.hoyM5 = this.getFechaAnterior(5);
    this.categoriesG1.push(this.hoyM5);
    await this.loadTickets(this.hoyM5);
    this.hoyM4 = this.getFechaAnterior(4);
    this.categoriesG1.push(this.hoyM4);
    await this.loadTickets(this.hoyM4);
    this.hoyM3 = this.getFechaAnterior(3);
    this.categoriesG1.push(this.hoyM3);
    await this.loadTickets(this.hoyM3);
    this.hoyM2 = this.getFechaAnterior(2);
    this.categoriesG1.push(this.hoyM2);
    await this.loadTickets(this.hoyM2);
    this.hoyM1 = this.getFechaAnterior(1);
    this.categoriesG1.push(this.hoyM1);
    await this.loadTickets(this.hoyM1);
    this.hoy = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.categoriesG1.push(this.hoy);
    await this.loadTickets(this.hoy);
    
    console.log("RENDER CHARTS");
    console.log("RENDER CHARTS - data " + this.dataG1);
    console.log("RENDER CHARTS - data2 " + this.dataG2);
    console.log("RENDER CHARTS - data3 " + this.dataG3);
    console.log("RENDER CHARTS - categories " + this.categoriesG1);
    this.renderChart();
    this.isLoadingResults = false;
  }

  async loadTickets(fecha: string | null): Promise<void> {
    this.isLoadingResults = true;
    let errorResponse: any;
    try {
      console.log("FECHA SELECCIONADA :: " + fecha);
      if(fecha != null) {
        let idTienda = localStorage.getItem(LocalStorageConstants.ID_TIENDA);
        let idTPV = localStorage.getItem(LocalStorageConstants.ID_TPV);
        let tickets = await this.ticketsService.getTicket(idTienda, idTPV, fecha);
        if(tickets != null) {
          tickets?.shift();
          let ticketsCount = tickets?.length;
          console.log("TICKETS COUNT :: " + ticketsCount);
          this.dataG1.push(ticketsCount);
          let sumaImportesCI = tickets.reduce((total, valor) => total + valor.totalConImpuestos, 0);
          this.dataG2.push(sumaImportesCI);
          if(ticketsCount > 0) {
            let ticketMedio = parseFloat((sumaImportesCI/ticketsCount).toFixed(2));
            this.dataG3.push(ticketMedio);
          } else {
            this.dataG3.push(0);
          }
        }
      }
    } catch (error: any) {
      errorResponse = error.error;
      this.isLoadingResults = false;
    }
  }

  getFechaAnterior(diasMenos: number): string | null {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - diasMenos);
    let fechaAnterior = this.datePipe.transform(fecha, 'dd/MM/yyyy');
    return fechaAnterior;
  }

  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }

  renderChart(): void {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Tickets ultima semana'
      },
      xAxis: {
        categories: this.categoriesG1,
        title: {
          text: 'Jornada'
        }
      },
      yAxis: {
        title: {
          text: 'Núm. Tickets'
        }
      },
      series: [{
        type: 'column',
        name: 'Núm. Tickets',
        data: this.dataG1,
        color: '#1CAF9A'
      }]
    };

    Highcharts.chart('chart-tickets-ultima-semana', chartOptions);

    const chartOptions2: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Importe ventas ultima semana'
      },
      xAxis: {
        categories: this.categoriesG1,
        title: {
          text: 'Jornada'
        }
      },
      yAxis: {
        title: {
          text: 'Importe Ventas Brutas'
        }
      },
      series: [{
        type: 'column',
        name: 'Importe Ventas Brutas',
        data: this.dataG2,
        color: '#1CAF9A'
      },
      {
        type: 'column',
        name: 'Importe Ticket Medio',
        data: this.dataG3,
        color: '#428bca'
      }]
    };

    Highcharts.chart('chart-importe-ultima-semana', chartOptions2);
  }

}
