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
import { TicketItemsComponent } from './ticket-items/ticket-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentComponent } from './payment/payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TicketPrintComponent } from './ticket-print/ticket-print.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssociatedProductsComponent } from './associated-products/associated-products.component';
import { AssociatedProductsItemComponent } from './associated-products-item/associated-products-item.component';
import { AssociatedProductsGroupComponent } from './associated-products-group/associated-products-group.component';




@NgModule({
  declarations: [
    MainSalesComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    ProductsComponent,
    TicketComponent,
    TicketItemsComponent,
    PaymentComponent,
    TicketPrintComponent,
    AssociatedProductsComponent,
    AssociatedProductsItemComponent,
    AssociatedProductsGroupComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class SalesModule { }
