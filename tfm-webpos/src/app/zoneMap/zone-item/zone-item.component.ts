import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'zone-item',
  templateUrl: './zone-item.component.html',
  styleUrls: ['./zone-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ZoneItemComponent implements OnInit {
  
  @Input() zoneId: string = '';
  @Input() zoneCode: string = '';
  @Input() zoneName: string = '';
  @Input() zoneSelected: boolean = false;
  
  @Output() zoneSelectedChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if(this.zoneSelected == true) {
      this.eventZoneSelected();
    }
  }

  public eventZoneSelected() :void {
    console.log("Emit event to parent");
    this.zoneSelectedChange.emit(this.zoneId);
    this.zoneSelected = true;
  }

}
