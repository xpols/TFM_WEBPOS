import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { TicketsService } from 'src/app/Services/tickets.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { TicketCabeceraDTO } from 'src/app/models/ticketCabecera.dto';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})

export class TicketListComponent implements OnInit {

  dataSource: MatTableDataSource<TicketCabeceraDTO> ;
  displayedColumns: string[] = ['codigo', 'fechaHora', 'totalConImpuestos'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatDatepicker) datePicker!: MatDatepicker<Date>;
  selectedDateControl: FormControl = new FormControl();
  hoy: Date;

  constructor(private ticketsService: TicketsService, private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('es-ES');
    this.hoy = new Date();
    this.dataSource = new MatTableDataSource<TicketCabeceraDTO>();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dateAdapter.setLocale('es'); // Establece el idioma a español
    this.datePicker.select(this.hoy); // Autoselecciona el día de hoy
    
    this.loadTickets();
  }

  ngOnInit(): void {
    
  }

  onDateChange(event: any): void {
    if(this.datePicker?.startAt != null) {
      // Cerrar el selector de fecha después de seleccionar una fecha
      this.datePicker.close();
      // Volver a ejecutar la llamada a la API
      this.loadTickets();
    }
  }

  openDatePicker(datepicker: MatDatepicker<Date>) {
    this.datePicker = datepicker;
    this.datePicker.open();
  }

  async loadTickets(): Promise<void> {
    let errorResponse: any;
    try {
      const selectedDate: Date | null = this.datePicker?.startAt;
      console.log("FECHA SELECCIONADA :: " + selectedDate);
      if(selectedDate != null) {
        console.log("FECHA FORMATEADA :: " + this.formatDate(selectedDate));
        let idTienda = localStorage.getItem(LocalStorageConstants.ID_TIENDA);
        let idTPV = localStorage.getItem(LocalStorageConstants.ID_TPV);
        let tickets = await this.ticketsService.getTicket(idTienda, idTPV, this.formatDate(selectedDate));
        tickets?.shift();
        this.dataSource = new MatTableDataSource(tickets);
        this.dataSource.paginator = this.paginator;
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }

}
