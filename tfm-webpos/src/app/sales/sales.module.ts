import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSalesComponent } from './main-sales/main-sales.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ProductsComponent } from './products/products.component';
import { TicketComponent } from './ticket/ticket.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    MainSalesComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    ProductsComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class SalesModule { }
