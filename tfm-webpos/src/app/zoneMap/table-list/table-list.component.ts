import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ZonaMesasService } from 'src/app/Services/zona-mesas.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { MesaDTO } from 'src/app/models/mesa.dto';
//import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

  mesas: MesaDTO[] | undefined;
  breakpoint: number = 6;
  destroyed = new Subject<void>();
  displayNameMap = new Map([
    [Breakpoints.XSmall, '2'],
    [Breakpoints.Small, '4'],
    [Breakpoints.Medium, '6'],
    [Breakpoints.Large, '8'],
    [Breakpoints.XLarge, '10'],
  ]);
  private eventsSubscriptionZoneToTableList: Subscription | undefined;


  constructor(private zonaMesasService: ZonaMesasService, breakpointObserver: BreakpointObserver) { 
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.breakpoint = Number(this.displayNameMap.get(query)) ?? 6;
          }
        }
      });
  }

  @Input() events: Observable<any> | undefined;
  ngOnInit(){
    this.eventsSubscriptionZoneToTableList = this.events?.subscribe((zoneId) => {
      this.loadTables(zoneId);
    });
  }

  ngOnDestroy() {
    this.eventsSubscriptionZoneToTableList?.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }

  private async loadTables(zoneId: string): Promise<void> {
    let errorResponse: any;
    try {
      this.mesas = await this.zonaMesasService.getMesas(zoneId);
      let ticketsAbiertos = await this.zonaMesasService.getTicketAbiertos(localStorage.getItem(LocalStorageConstants.ID_TPV));
      this.mesas?.forEach(function (mesa) {
        let existeTicket = ticketsAbiertos?.find(i => i.mesa == mesa.nombre);
        mesa.idTicketAbierto = existeTicket != null ? existeTicket.id : null;
      });
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

}
