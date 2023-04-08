import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ZonaMesasService } from 'src/app/Services/zona-mesas.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { MesaDTO } from 'src/app/models/mesa.dto';
import { ZonaMesasDTO } from 'src/app/models/zonamesas.dto';

@Component({
  selector: 'tables-map',
  templateUrl: './tables-map.component.html',
  styleUrls: ['./tables-map.component.scss']
})
export class TablesMapComponent implements OnInit {

  zonas: ZonaMesasDTO[] | undefined = [];
  eventsZoneToTableList: Subject<string> = new Subject<string>();

  constructor(private zonaMesasService: ZonaMesasService) { }

  ngOnInit(): void {
  }

  zoneChange(zoneId: string): void {
    console.log("ZONA RECIBIDA " + zoneId);
    this.emitZoneToTableList(zoneId);
  }
  
  emitZoneToTableList(zoneId: string): void {
    this.eventsZoneToTableList.next(zoneId);
  }
}
