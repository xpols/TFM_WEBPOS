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
import { MatDialog } from '@angular/material/dialog';
import { TicketViewComponent } from '../ticket-view/ticket-view.component';
import { SharedService } from 'src/app/Services/shared.service';


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
  isLoadingResults = false;

  constructor(private ticketsService: TicketsService, private dateAdapter: DateAdapter<Date>, public dialog: MatDialog, private sharedService: SharedService) { 
    this.sharedService.setTableName(undefined);
    this.sharedService.setNumDiners(0);
    this.dateAdapter.setLocale('es-ES');
    this.hoy = new Date();
    this.dataSource = new MatTableDataSource<TicketCabeceraDTO>([]);
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
    this.isLoadingResults = true;
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
          this.dataSource = new MatTableDataSource(this.tickets);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        this.isLoadingResults = false;
      }
    } catch (error: any) {
      errorResponse = error.error;
      this.isLoadingResults = false;
    }
  }

  ticketClick(row: any) {
    console.log("Fila seleccionada:", row);
    // Realizar acciones adicionales con los datos de la fila seleccionada
    if(row != undefined) {
      const dialogRef = this.dialog.open(TicketViewComponent, {
        data: row,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Ticket view dialog was closed :: ' + JSON.stringify(result));
      });
    }
  }


  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }

}
