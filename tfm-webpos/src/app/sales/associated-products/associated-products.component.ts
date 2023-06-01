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

  constructor(public dialogRef: MatDialogRef<AssociatedProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataAssociatedProduct,
    private mainSalesService: MainSalesService) { }

  ngOnInit(): void {
    console.log("ASSOCIATED PRODUCT INIT :: " + JSON.stringify(this.data));
    this.setMaxPageIndex();
    this.setCurrentData();
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
  }

  finishSelection():void {
    console.log("FINISH SELECTION");
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
