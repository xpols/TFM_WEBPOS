import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { CategoriasDTO } from 'src/app/models/categorias.dto';
import { ConfigProductosDTO, FamiliasCPDTO } from 'src/app/models/configProductos.dto';
import { GruposImagenesDTO } from 'src/app/models/gruposImagenes.dto';
import { UbicacionDTO } from 'src/app/models/ubicacion.dto';
import { UbicacionesDTO } from 'src/app/models/ubicaciones.dto';

@Component({
  selector: 'main-sales',
  templateUrl: './main-sales.component.html',
  styleUrls: ['./main-sales.component.scss']
})
export class MainSalesComponent implements OnInit {

  tableTicketId: string | null = null;
  numDiners: number | undefined;
  ubicaciones: UbicacionesDTO[] | undefined = [];
  ubicacion: UbicacionDTO | undefined;
  ubicacionConfig: ConfigProductosDTO[] | undefined;
  categorias: CategoriasDTO[] | undefined = [];
  familias: FamiliasCPDTO[] | undefined = [];
  filasFamilias: number = 10;

  constructor(private route: ActivatedRoute, private mainSalesService: MainSalesService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        console.log("PARAMS :: " + JSON.stringify(params));
        this.tableTicketId = params["tableTicketId"];
        this.numDiners = params["numDiners"];
        this.loadConfigUbicacion();
      }
    );
  }

  private async loadConfigUbicacion(): Promise<void> {
    let errorResponse: any;
    try {
      this.ubicaciones = await this.mainSalesService.getUbicaciones(localStorage.getItem(LocalStorageConstants.CODIGO_TIENDA));
      if(this.ubicaciones !== undefined && this.ubicaciones?.length !== 0) {
        this.ubicacion = await this.mainSalesService.getUbicacion(this.ubicaciones[0].id);
        if(this.ubicacion !== undefined) {
          this.ubicacionConfig = await this.mainSalesService.getRecuperarConfiguracion(this.ubicacion.idMedida.id, this.ubicaciones[0].id);
          this.loadCategories();
          
        }
      }
    } catch (error: any) {
      console.log("CONFIG UBICACIONES :: ERROR :: " + error);
      errorResponse = error.error;
    }
  }

  private async loadCategories(): Promise<void> {
    let errorResponse: any;
    try {
      let idDominio = localStorage.getItem(LocalStorageConstants.DOMINIO_USUARIO);
      if(idDominio != undefined) {
        this.categorias = await this.mainSalesService.getCategorias(idDominio);
        this.matchCategories();
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private matchCategories(): void {
    if(this.ubicacionConfig != undefined && this.ubicacionConfig?.length !== 0) {
      this.ubicacionConfig[0].familias.map( (familia) => {
        if(familia.guardada !== null && this.categorias != null) {
          let categoriaEncontrada = this.categorias.find(categoria => Number(categoria.id) == familia.guardada);
          familia.nombre = categoriaEncontrada?.nombre;
          if(categoriaEncontrada?.idGrupoImagenes_imagenes != undefined ) {
            console.log("CATEGORIA ENCONTRADA IMAGEN :: " + JSON.stringify(categoriaEncontrada?.idGrupoImagenes_imagenes[0]));
            familia.imagen = localStorage.getItem(LocalStorageConstants.IMAGE_BASE_PATH) + categoriaEncontrada?.idGrupoImagenes_imagenes[0].ficheroUid + ".png";
          }
        }
        return familia;
      });
      this.familias = this.ubicacionConfig[0].familias;
      this.filasFamilias = this.ubicacionConfig[0].medidas.filasFamilias;
    } 
  }
}
