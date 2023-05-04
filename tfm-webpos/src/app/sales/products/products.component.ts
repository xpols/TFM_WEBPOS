import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FamiliasCPDTO, ProuctoCPDTO } from 'src/app/models/configProductos.dto';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() productos: ProuctoCPDTO[][] | undefined = [];
  @Input() filasProductos: number = 0;
  @Input() columnasProductos: number = 0;
  @Output() productoSelecionado = new EventEmitter<number>();
  productosCurrent: ProuctoCPDTO[] | undefined = [];
  pageIndex: number = 0;
  maxPageIndex: number = 0;
  categoriaSelecionadaActual: string | undefined;



  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["productos"] != undefined && changes["productos"].currentValue != changes["productos"].previousValue && changes["productos"].currentValue.length > 0) {
      console.log("PRODUCTOS CHANGE " + changes["productos"].currentValue);
      this.setMaxPageIndex();
      this.setCurrentData();
    }
    if(changes["filasProductos"]?.currentValue != changes["filasProductos"]?.previousValue) {
      console.log("FILAS PRODUCTOS CHANGE " + changes["filasProductos"].currentValue);
      this.setMaxPageIndex();
      this.setCurrentData();
    }
    if(changes["columnasProductos"]?.currentValue != changes["columnasProductos"]?.previousValue) {
      console.log("COLUMNAS PRODUCTOS CHANGE " + changes["columnasProductos"].currentValue);
      this.setMaxPageIndex();
      this.setCurrentData();
    }
    if(changes["pageIndex"]?.currentValue != changes["pageIndex"]?.previousValue) {
      console.log("PAGE INDEX CHANGE " + changes["pageIndex"].currentValue);
      this.setCurrentData();
    }
  }

  setMaxPageIndex(): void {
    if(this.filasProductos != 0 && this.productos != undefined && this.productos.length !== 0) {
      this.maxPageIndex = Math.ceil(this.productos.length / this.filasProductos) - 1;
    }
  }

  setCurrentData(): void {
    let from: number = this.pageIndex * this.filasProductos;
    let to: number = from + this.filasProductos;
    console.log("PRODUCTS FROM :: " + from);
    console.log("PRODUCTS TO :: " + to);
    console.log("PRODUCTS SLICE  :: " + this.productos?.slice(from, to));
    this.productosCurrent = this.productos?.slice(from, to).reduce((acc, curr) => acc.concat(curr), []);;
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

  selectProduct(idProduct: number | undefined) {
    console.log("Producto seleccionado :: " + idProduct);
    this.productoSelecionado.emit(idProduct);
  }

}
