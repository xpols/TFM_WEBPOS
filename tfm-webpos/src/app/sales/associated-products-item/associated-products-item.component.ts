import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { SeleccionesProductoDTO } from 'src/app/models/seleccionesProducto.dto';

@Component({
  selector: 'associated-products-item',
  templateUrl: './associated-products-item.component.html',
  styleUrls: ['./associated-products-item.component.scss']
})
export class AssociatedProductsItemComponent implements OnInit {

  @Input() seleccion: SeleccionesProductoDTO;
  @Output() productoModificado = new EventEmitter<SeleccionesProductoDTO>();

  constructor() { 
    this.seleccion =  new SeleccionesProductoDTO(
      '', //id: string;
      0, //idEleccionProducto_idNombreEleccionProducto_nombre: number;
      new ObjectComboDTO('','',''), //idProductoSeleccionado_nombre: ObjectComboDTO;
      false, //activaConfiguracion: boolean;
      false, //esSuplemento: boolean;
      0 //orden: number;
    );
  }

  ngOnInit(): void {
    
  }

  plus() {
    this.seleccion.cantidadSeleccionada++
    this.productoModificado.emit(this.seleccion);
  }

  minus() {
    if(this.seleccion.cantidadSeleccionada > 0) {
      this.seleccion.cantidadSeleccionada--
    }
    this.productoModificado.emit(this.seleccion);
  }

}
