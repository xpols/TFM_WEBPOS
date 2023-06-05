import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EleccionesProductoDTO } from 'src/app/models/eleccionesProducto.dto';
import { ObjectComboDTO } from 'src/app/models/objectCombo.dto';
import { SeleccionesProductoDTO } from 'src/app/models/seleccionesProducto.dto';

@Component({
  selector: 'associated-products-group',
  templateUrl: './associated-products-group.component.html',
  styleUrls: ['./associated-products-group.component.scss']
})
export class AssociatedProductsGroupComponent implements OnInit {

  @Input() grupo: EleccionesProductoDTO;
  @Output() productoModificado = new EventEmitter<SeleccionesProductoDTO>();
  seleccionesCurrent: SeleccionesProductoDTO[] = [];

  pageIndex: number = 0;
  maxPageIndex: number = 0;
  numProductsPage: number = 4;
  primeraCarga: boolean = false;

  constructor() { 
    this.grupo = new EleccionesProductoDTO(
      '', //id: string;
      new ObjectComboDTO('', '', ''), //idNombreEleccionProducto_nombre: ObjectComboDTO;
      new ObjectComboDTO('', '', ''), //idNombreEleccionProducto_seleccionesRecuento: ObjectComboDTO;
      new ObjectComboDTO('', '', ''), //idProducto_nombre: ObjectComboDTO;
      0, //maxProdAElegir: number;
      0, //minProdAElegir: number;
      0, //orden: number;
      false, //sonFijos: boolean;
      false, //sonIngredientes: boolean;
      false //sonModificadores: boolean;
    );
  }

  ngOnInit(): void {
    this.setMaxPageIndex();
    this.setCurrentData();
  }

  setCurrentData(): void {
    let from: number = this.pageIndex * this.numProductsPage;
    let to: number = from + this.numProductsPage;
    console.log("FROM :: " + from);
    console.log("TO :: " + to);
    console.log("SLICE  :: " + this.grupo.selecciones?.slice(from, to));
    this.seleccionesCurrent = this.grupo.selecciones?.slice(from, to);
    if(this.seleccionesCurrent != undefined && this.seleccionesCurrent.length > 0 && this.primeraCarga == false) {
      this.primeraCarga = true;
    }
  }

  setMaxPageIndex(): void {
    if(this.grupo.selecciones.length > 0) {
      this.maxPageIndex = Math.ceil(this.grupo.selecciones.length / this.numProductsPage) - 1;
    } else {
      this.maxPageIndex = 1;
    }
  }

  updatePage(incrementar: boolean): void {
    console.log("updatePage");
    if(incrementar) {
      if(this.pageIndex < this.maxPageIndex) {
        this.pageIndex++;
        this.setCurrentData();
      }
    } else {
      if(this.pageIndex >= 1) {
        this.pageIndex--;
        this.setCurrentData();
      }
    }
  }

  recibirSeleccionModificada(selectionModify: SeleccionesProductoDTO) {
    console.log("SELECCION MOIDIFCADA GRUPO :: " + JSON.stringify(selectionModify));
    this.productoModificado.emit(selectionModify);
  }
}
