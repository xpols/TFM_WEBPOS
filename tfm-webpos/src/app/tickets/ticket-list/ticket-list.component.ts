import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { TicketsService } from 'src/app/Services/tickets.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { TicketCabeceraDTO } from 'src/app/models/ticketCabecera.dto';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})

export class TicketListComponent implements OnInit {

  dataSource!: MatTableDataSource<TicketCabeceraDTO> ;
  tickets: TicketCabeceraDTO[] | undefined;
  displayedColumns: string[] = ['codigo', 'fechaHora', 'fechaJornada', 'idCanalVenta_descripcion', 'totalBruto', 'totalSinImpuestos', 'totalConImpuestos', 'idEstadoDocumento_descripcion'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepicker) datePicker!: MatDatepicker<Date>;
  selectedDateControl: FormControl = new FormControl();
  hoy: Date;


  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private ticketsService: TicketsService, private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('es-ES');
    this.hoy = new Date();
    this.dataSource = new MatTableDataSource<TicketCabeceraDTO>([]);
    //this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dateAdapter.setLocale('es'); // Establece el idioma a español
    this.datePicker.select(this.hoy); // Autoselecciona el día de hoy
    
    //this.dataSource.paginator = this.paginator;
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
        this.tickets = await this.ticketsService.getTicket(idTienda, idTPV, this.formatDate(selectedDate));
        if(this.tickets != null) {
          this.tickets?.shift();
          console.log("this.tickets?.length :: " + this.tickets?.length);
          this.length = this.tickets?.length;
          this.dataSource = new MatTableDataSource(this.tickets);
          this.dataSource.sort = this.sort;
        }
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  /*handlePageEvent(e: PageEvent) {
    console.log("HANDLE PAGE EVENT");
    console.log("HANDLE PAGE EVENT :: e.length " + e.length);
    console.log("HANDLE PAGE EVENT :: e.pageSize " + e.pageSize);
    console.log("HANDLE PAGE EVENT :: e.pageIndex " + e.pageIndex);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.setPageData();
  }*/

  /*setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }*/

  /*setPageData() {
    let from: number = this.pageIndex * this.pageSize;
    let to: number = from + this.pageSize;
    console.log("FROM :: " + from);
    console.log("TO :: " + to);
    if(this.tickets != null) {
      let ticketsPreMostrar = this.tickets?.slice();
      let ticketsMostrar = this.tickets?.slice();
      let ticketsPosMostrar = this.tickets?.slice();
      console.log("SLICE  PRE :: " + ticketsPreMostrar.slice(0, from));
      console.log("SLICE  MOSTRAR :: " + ticketsMostrar.slice(from, to));
      console.log("SLICE  POST :: " + ticketsPosMostrar.slice(to, ticketsPosMostrar.length-1));
      let newDatasource = ticketsMostrar.concat(ticketsPosMostrar, ticketsPreMostrar);
      this.length = this.tickets?.length;
      this.dataSource = new MatTableDataSource(newDatasource);
      this.dataSource.paginator = this.paginator;
    }

  }*/

  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }

}
