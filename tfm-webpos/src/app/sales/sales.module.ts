import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSalesComponent } from './main-sales/main-sales.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ProductsComponent } from './products/products.component';
import { TicketComponent } from './ticket/ticket.component';



@NgModule({
  declarations: [
    MainSalesComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    ProductsComponent,
    TicketComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SalesModule { }
