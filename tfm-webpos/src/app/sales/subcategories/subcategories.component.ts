import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SubfamiliasCPDTO } from 'src/app/models/configProductos.dto';

@Component({
  selector: 'subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {

  @Input() subcategorias: SubfamiliasCPDTO[] | undefined = [];
  @Input() filasSubfamilias: number = 0;
  @Output() subcategoriaSelecionada = new EventEmitter<string>();
  subcategoriasCurrent: SubfamiliasCPDTO[] | undefined = [];
  pageIndex: number = 0;
  maxPageIndex: number = 0;
  subcategoriaSelecionadaActual: string | undefined;



  constructor() { }

  ngOnInit(): void {
    this.calcularNumeroColumnas(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log('La ventana ha cambiado de tamaño', event.target.innerWidth);
    this.calcularNumeroColumnas(event.target.innerWidth);
  }

  calcularNumeroColumnas(anchoVentana: number): void {
    if(anchoVentana <= 1024) {
      this.filasSubfamilias = 3;
    } else if(anchoVentana > 1024 && anchoVentana <= 1200) {
      this.filasSubfamilias = 4;
    } else if(anchoVentana > 1200 && anchoVentana <= 1400) { 
      this.filasSubfamilias = 5;
    } else if(anchoVentana > 1400 && anchoVentana <= 1600) { 
      this.filasSubfamilias = 6;
    } else if(anchoVentana > 1600 && anchoVentana <= 1800) { 
      this.filasSubfamilias = 7;
    } else if(anchoVentana > 1800) { 
      this.filasSubfamilias = 8;
    }
    console.log("NUEVO NUMERO DE COLUMNAS :: " + this.filasSubfamilias);
    this.setMaxPageIndex();
    this.setCurrentData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["subcategorias"] != undefined && changes["subcategorias"].currentValue != changes["subcategorias"].previousValue && changes["subcategorias"].currentValue.length > 0) {
      console.log("SUBCATEGORIAS CHANGE " + changes["subcategorias"].currentValue);
      this.subcategoriaSelecionadaActual = undefined;
      this.setMaxPageIndex();
      this.setCurrentData();
    }
    if(changes["filasSubfamilias"]?.currentValue != changes["filasSubfamilias"]?.previousValue) {
      console.log("FILAS SUBFAMILIAS CHANGE " + changes["filasSubfamilias"].currentValue);
      this.setMaxPageIndex();
      this.setCurrentData();
    }
    if(changes["pageIndex"]?.currentValue != changes["pageIndex"]?.previousValue) {
      console.log("PAGE INDEX CHANGE " + changes["pageIndex"].currentValue);
      this.setCurrentData();
    }
  }

  setMaxPageIndex(): void {
    if(this.filasSubfamilias != 0 && this.subcategorias != undefined && this.subcategorias.length !== 0) {
      this.maxPageIndex = Math.ceil(this.subcategorias.length / this.filasSubfamilias) - 1;
    }
  }

  setCurrentData(): void {
    let from: number = this.pageIndex * this.filasSubfamilias;
    let to: number = from + this.filasSubfamilias;
    console.log("FROM :: " + from);
    console.log("TO :: " + to);
    console.log("SLICE  :: " + this.subcategorias?.slice(from, to));
    this.subcategoriasCurrent = this.subcategorias?.slice(from, to);
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

  selectSubCategory(idSubCategory: string | undefined) {
    console.log("SubCategoria seleccionada :: " + idSubCategory);
    this.subcategoriaSelecionada.emit(idSubCategory);
    this.subcategoriaSelecionadaActual = idSubCategory;
  }

}
