import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { TicketCabeceraDTO } from 'src/app/models/ticketCabecera.dto';
import { TicketDetalleDTO } from 'src/app/models/ticketDetalle.dto';
import { TicketPagoDTO } from 'src/app/models/ticketPago.dto';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.scss']
})
export class TicketViewComponent implements OnInit {

  detalles: TicketDetalleDTO[] | undefined = [];
  pagos: TicketPagoDTO[] | undefined = [];

  dataSource!: MatTableDataSource<TicketDetalleDTO> ;
  displayedColumns: string[] = ['idProducto_nombre', 'cantidad', 'precioUnitarioConImpuestos', 'totalConImpuestos', 'fechaHoraSeleccionado'];
  @ViewChild(MatSort) sort!: MatSort;

  dataSourcePagos!: MatTableDataSource<TicketPagoDTO> ;
  displayedColumnsPagos: string[] = ['idFormaPago_descripcion', 'importe'];
  @ViewChild(MatSort) sortPagos!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<TicketViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketCabeceraDTO,
    private mainSalesService: MainSalesService
  ) {}

  ngOnInit(): void {
    console.log("BUSCAMOS DETALLE PARA TICKET :: " + this.data.id);
    this.loadTicket();
  }

  private async loadTicket(): Promise<void> {
    console.log("LOAD TICKET");
    let errorResponse: any;
    try {
      this.detalles = await this.mainSalesService.getTicketDetalles(this.data.id);
      this.dataSource = new MatTableDataSource(this.detalles);
      this.dataSource.sort = this.sort;
      this.pagos = await this.mainSalesService.getTicketPagos(this.data.id);
      this.dataSourcePagos = new MatTableDataSource(this.pagos);
      this.dataSourcePagos.sort = this.sortPagos;
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
