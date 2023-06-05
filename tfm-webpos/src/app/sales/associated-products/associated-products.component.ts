import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { DataAssociatedProduct } from 'src/app/models/data-associated-product';
import { EleccionesProductoDTO } from 'src/app/models/eleccionesProducto.dto';
import { SeleccionesProductoDTO } from 'src/app/models/seleccionesProducto.dto';

@Component({
  selector: 'app-associated-products',
  templateUrl: './associated-products.component.html',
  styleUrls: ['./associated-products.component.scss']
})
export class AssociatedProductsComponent implements OnInit {

  gruposCurrent: EleccionesProductoDTO[] = [];
  qty: number = 1;
  pageIndex: number = 0;
  maxPageIndex: number = 0;
  numGroupsPage: number = 4;
  primeraCarga: boolean = false;

  permitirEnviar: boolean = false;

  constructor(public dialogRef: MatDialogRef<AssociatedProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataAssociatedProduct,
    private mainSalesService: MainSalesService) { }

  ngOnInit(): void {
    console.log("ASSOCIATED PRODUCT INIT :: " + JSON.stringify(this.data));
    this.setMaxPageIndex();
    this.setCurrentData();
    this.checkMenuComplete();
  }

  setCurrentData(): void {
    let from: number = this.pageIndex * this.numGroupsPage;
    let to: number = from + this.numGroupsPage;
    console.log("FROM :: " + from);
    console.log("TO :: " + to);
    console.log("SLICE  :: " + this.data.grupos?.slice(from, to));
    this.gruposCurrent = this.data.grupos?.slice(from, to);
    if(this.gruposCurrent != undefined && this.gruposCurrent.length > 0 && this.primeraCarga == false) {
      this.primeraCarga = true;
    }
  }

  setMaxPageIndex(): void {
    if(this.data.grupos.length > 0) {
      this.maxPageIndex = Math.ceil(this.data.grupos.length / this.numGroupsPage) - 1;
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

  plusQty(): void {
    this.qty = Number(this.qty) + 1;
  }

  minusQty(): void {
    if(this.qty > 1) {
      this.qty = Number(this.qty) -1;
    }
  }

  recibirSeleccionModificada(selectionModify: SeleccionesProductoDTO) {
    console.log("SELECCION MOIDIFCADA :: " + JSON.stringify(selectionModify));
    this.countSeleccionadod(selectionModify);
  }

  finishSelection():void {
    console.log("FINISH SELECTION");
    let gruposFiltrados =  this.data.grupos.filter(grupo => grupo.cantidadSeleccionada > 0);
    gruposFiltrados = gruposFiltrados.map(grupo => {
      grupo.selecciones = grupo.selecciones.filter(seleccion => seleccion.cantidadSeleccionada > 0);
      return grupo
    });
    this.dialogRef.close(gruposFiltrados);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  countSeleccionadod(selectionModify: SeleccionesProductoDTO) {
    this.data.grupos = this.data.grupos.map(grupo => {
      if(grupo.id == selectionModify.idEleccionProducto_idNombreEleccionProducto_nombre.toString()) {
        console.log("GRUPO ENCONTRADO :: " + grupo.idNombreEleccionProducto_nombre.descripcion);
        grupo.selecciones.map(seleccion => {
          if(seleccion.id == selectionModify.id) {
            console.log("SELECCION ENCONTRADA :: " + seleccion.idProductoSeleccionado_nombre.descripcion);
            seleccion.cantidadSeleccionada = selectionModify.cantidadSeleccionada;
          }
          return seleccion;
        });
        let sumCantidades = grupo.selecciones.reduce((accumulator, currentValue) => accumulator + currentValue.cantidadSeleccionada, 0);
        console.log("GRUPO MAX :: " + grupo.maxProdAElegir);
        console.log("GRUPO sumCantidades :: " + sumCantidades);
        grupo.cantidadSeleccionada = sumCantidades;
        if(sumCantidades >= grupo.maxProdAElegir) {
          grupo.grupoValido = true;
          grupo.grupoCompleto = true;
        }

        if(sumCantidades < grupo.maxProdAElegir && grupo.minProdAElegir > 0) {
          grupo.grupoCompleto = false;
          grupo.grupoValido = false;
        }

        if(grupo.minProdAElegir == 0 && sumCantidades < grupo.maxProdAElegir) {
          grupo.grupoValido = false;
          grupo.grupoCompleto = true;
        }
      }
      return grupo;
    });
    this.setCurrentData();
    this.checkMenuComplete();
  }

  checkMenuComplete() {
    this.permitirEnviar = this.data.grupos.every(grupo => grupo.hasOwnProperty('grupoCompleto') && grupo.grupoCompleto === true);
    console.log("MENU COMPLETO ???? " + this.permitirEnviar);
  }
}
