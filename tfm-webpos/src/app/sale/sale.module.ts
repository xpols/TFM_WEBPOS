import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesMapComponent } from './tables-map/tables-map.component';
import { TableListComponent } from './table-list/table-list.component';
import { TableItemComponent } from './table-item/table-item.component';



@NgModule({
  declarations: [
    TablesMapComponent,
    TableListComponent,
    TableItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SaleModule { }
