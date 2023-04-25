import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FamiliasCPDTO } from 'src/app/models/configProductos.dto';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() categorias: FamiliasCPDTO[] | undefined = [];
  @Input() filasFamilias: number = 0;
  @Output() categoriaSelecionada = new EventEmitter<string>();
  categoriasCurrent: FamiliasCPDTO[] | undefined = [];
  pageIndex: number = 0;
  maxPageIndex: number = 0;
  categoriaSelecionadaActual: string | undefined;
  primeraCarga: boolean = false;



  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["categorias"].currentValue != changes["categorias"].previousValue && changes["categorias"].currentValue.length > 0) {
      console.log("CATEGORIAS CHANGE " + changes["categorias"].currentValue);
      this.setMaxPageIndex();
      this.setCurrentData();
    }
    if(changes["filasFamilias"]?.currentValue != changes["filasFamilias"]?.previousValue) {
      console.log("FILAS FAMILIAS CHANGE " + changes["filasFamilias"].currentValue);
      this.setMaxPageIndex();
      this.setCurrentData();
    }
    if(changes["pageIndex"]?.currentValue != changes["pageIndex"]?.previousValue) {
      console.log("PAGE INDEX CHANGE " + changes["pageIndex"].currentValue);
      this.setCurrentData();
    }
  }

  setMaxPageIndex(): void {
    if(this.filasFamilias != 0 && this.categorias != undefined && this.categorias.length !== 0) {
      this.maxPageIndex = Math.ceil(this.categorias.length / this.filasFamilias) - 1;
    }
  }

  setCurrentData(): void {
    let from: number = this.pageIndex * this.filasFamilias;
    let to: number = from + this.filasFamilias;
    console.log("FROM :: " + from);
    console.log("TO :: " + to);
    console.log("SLICE  :: " + this.categorias?.slice(from, to));
    this.categoriasCurrent = this.categorias?.slice(from, to);
    if(this.categoriasCurrent != undefined && this.categoriasCurrent.length > 0 && this.primeraCarga == false) {
      this.selectCategory(this.categoriasCurrent[0].id);
      this.primeraCarga = true;
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

  selectCategory(idCategory: string | undefined) {
    console.log("Categoria seleccionada :: " + idCategory);
    this.categoriaSelecionada.emit(idCategory);
    this.categoriaSelecionadaActual = idCategory;
  }
}
