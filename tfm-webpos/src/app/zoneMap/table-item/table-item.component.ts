import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DinersComponent } from '../diners/diners.component';
import { Router } from '@angular/router';

@Component({
  selector: 'table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss']
})
export class TableItemComponent implements OnInit {

  @Input() tableId: string | undefined;
  @Input() tableName: string | undefined;
  @Input() tableTicketId: string | null = null;
  @Input() numDiners: number | undefined;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDinersDialog(): void {
    const dialogRef = this.dialog.open(DinersComponent, {
      data: {tableName: this.tableName, numDiners: this.numDiners},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed :: ' + result);
      if(result != undefined) {
        this.numDiners = result;
        this.router.navigate(['/sales'], {queryParams: {tableTicketId: null, numDiners: this.numDiners, tableName: this.tableName, tableId: this.tableId }});
      } 
    });
  }

  goToSaleScreen() {
    console.log("Go to sales screen");
    if(this.tableTicketId != null) {
      this.router.navigate(['/sales'], {queryParams: {tableTicketId: this.tableTicketId, numDiners: this.numDiners, tableName: this.tableName, tableId: this.tableId }});
    } else {
      this.openDinersDialog();
    }
  }
}
