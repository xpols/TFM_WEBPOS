import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge, of, startWith, switchMap } from 'rxjs';
import { CategoriasDTO } from 'src/app/models/categorias.dto';
import { FamiliasCPDTO } from 'src/app/models/configProductos.dto';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  @Input() categorias: FamiliasCPDTO[] | undefined = [];
  @Input() filasFamilias: number = 15;
  dataSource: any[] | undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

  //@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.paginator?.page.subscribe(
      (event) => console.log("EVENT :: " + event)
    );
    if(this.paginator !== undefined) {
      const from = this.paginator.pageIndex * this.filasFamilias;
      const to = from + this.filasFamilias;
      this.dataSource = this.categorias?.slice(from, to);
    }
  }

  // this method will link data to paginator
  linkListToPaginator() {
    console.log("LINKS TO");
    merge(this.paginator?.page).pipe(
        startWith({}),
        switchMap(() => {
          return of(this.categorias);
  }))
  .subscribe(res => {
    console.log("LINSKT TO PAGINATOR");
    if(this.paginator !== undefined) {
      const from = this.paginator.pageIndex * this.filasFamilias;
      const to = from + this.filasFamilias;
      this.dataSource = res?.slice(from, to);
    }
  });
  }
}
