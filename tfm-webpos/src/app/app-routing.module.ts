import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './auth/secure/secure.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { ConfigComponent } from './auth/config/config.component';
import { TablesMapComponent } from './zoneMap/tables-map/tables-map.component';
import { MainSalesComponent } from './sales/main-sales/main-sales.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'logout', canActivate: [ AuthGuard ], component: SecureComponent },
  { path: 'config', canActivate: [ AuthGuard ], component: ConfigComponent },
  { path: 'tables', canActivate: [ AuthGuard ], component: TablesMapComponent,
    loadChildren: () => import('./zoneMap/zoneMap.module').then(m => m.ZoneMapModule)
  },
  { path: 'sales', canActivate: [ AuthGuard ], component: MainSalesComponent,
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
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
