import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { ZonaMesasService } from 'src/app/Services/zona-mesas.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { MesaDTO } from 'src/app/models/mesa.dto';
import { ZonaMesasDTO } from 'src/app/models/zonamesas.dto';

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {

  zonas: ZonaMesasDTO[] | undefined = [];
  zonaSelected: string = '';

  @Output() zoneChange = new EventEmitter<string>();

  constructor(private zonaMesasService: ZonaMesasService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.setTableName(undefined);
    this.sharedService.setNumDiners(0);
    this.loadZones();
  }

  private async loadZones(): Promise<void> {
    let errorResponse: any;
    try {
      let idTienda = localStorage.getItem(LocalStorageConstants.ID_TIENDA);
      this.zonas = await this.zonaMesasService.getZonasMesas(idTienda);
      console.log("ZONAS CARGADAS " + this.zonas);
      if(this.zonas !== undefined) {
        this.zonaSelected = this.zonas[0].id;
        this.zonas[0].selected = true;
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  zoneSelected(zoneId: string): void {
    this.zonas?.forEach(function (zone) {
      zone.id == zoneId ? zone.selected = true : zone.selected = false;
    });
    this.zonaSelected = zoneId;
    console.log("ZONE CHANGE " + this.zonaSelected);
    this.zoneChange.emit(this.zonaSelected);
  }
}
