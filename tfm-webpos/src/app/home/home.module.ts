import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RedirectndComponent } from './redirectnd/redirectnd.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    HomeComponent,
    RedirectndComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TranslateModule
  ]
})
export class HomeModule { }
