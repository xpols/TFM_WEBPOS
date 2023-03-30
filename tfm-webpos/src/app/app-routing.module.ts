import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './auth/secure/secure.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { ConfigComponent } from './auth/config/config.component';
import { TablesMapComponent } from './sale/tables-map/tables-map.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'logout', canActivate: [ AuthGuard ], component: SecureComponent },
  { path: 'config', canActivate: [ AuthGuard ], component: ConfigComponent },
  { path: 'tables', canActivate: [ AuthGuard ], component: TablesMapComponent,
    loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
