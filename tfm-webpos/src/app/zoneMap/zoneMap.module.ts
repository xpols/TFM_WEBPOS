import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesMapComponent } from './tables-map/tables-map.component';
import { TableListComponent } from './table-list/table-list.component';
import { TableItemComponent } from './table-item/table-item.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ZoneItemComponent } from './zone-item/zone-item.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DinersComponent } from './diners/diners.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    TablesMapComponent,
    TableListComponent,
    TableItemComponent,
    ZoneListComponent,
    ZoneItemComponent,
    DinersComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ZoneMapModule { }
