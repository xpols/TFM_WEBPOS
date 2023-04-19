import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { CategoriasDTO } from 'src/app/models/categorias.dto';
import { ConfigProductosDTO, FamiliasCPDTO, ProuctoCPDTO, SubfamiliasCPDTO } from 'src/app/models/configProductos.dto';
import { GruposImagenesDTO } from 'src/app/models/gruposImagenes.dto';
import { ProductosDTO } from 'src/app/models/productos.dto';
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
  categoriaSelecionadaInput: string | null = null;

  mostrarSubfamilias: boolean = false;
  filasSubfamilias: number = 10;
  subfamilias: SubfamiliasCPDTO[] | undefined = [];
  subcategoriaSelecionadaInput: string | null = null;
  
  productos: ProuctoCPDTO[][] | undefined = [];
  filasProductos: number = 10;
  columnasProductos: number = 10;
  productosTodos: ProductosDTO[] | undefined = [];

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
        this.loadProducts();
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private async loadProducts(): Promise<void> {
    let errorResponse: any;
    try {
      let idDominio = localStorage.getItem(LocalStorageConstants.DOMINIO_USUARIO);
      if(idDominio != undefined) {
        this.productosTodos = await this.mainSalesService.getProductos(idDominio);
        this.matchProducts();
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
          
          console.log("EXISTEN SUBFAMILIAS");
          familia.subfamilias.map( (subfamilia) => {
            if(subfamilia.guardada !== null && this.categorias != null) {
              let subcategoriaEncontrada = this.categorias.find(categoria => Number(categoria.id) == subfamilia.guardada);
              subfamilia.nombre = subcategoriaEncontrada?.nombre;
              console.log("SUBFAMILIA NOMBRE ENCONTRADO :: " + subfamilia.nombre);
              if(subcategoriaEncontrada?.idGrupoImagenes_imagenes != undefined && subcategoriaEncontrada?.idGrupoImagenes_imagenes[0]) {
                console.log("SUBCATEGORIA ENCONTRADA IMAGEN :: " + JSON.stringify(subcategoriaEncontrada?.idGrupoImagenes_imagenes[0]));
                subfamilia.imagen = localStorage.getItem(LocalStorageConstants.IMAGE_BASE_PATH) + subcategoriaEncontrada?.idGrupoImagenes_imagenes[0].ficheroUid + ".png";
              }
            }
            return subfamilia;
          });
        }
        return familia;
      });
      this.familias = this.ubicacionConfig[0].familias;
      this.filasFamilias = this.ubicacionConfig[0].medidas.filasFamilias;
      this.filasSubfamilias = this.ubicacionConfig[0].medidas.filasSubfamilias;
      this.filasProductos = this.ubicacionConfig[0].medidas.filas;
      this.columnasProductos = this.ubicacionConfig[0].medidas.columnas;
    } 
  }

  private matchProducts(): void {
    if(this.ubicacionConfig != undefined && this.ubicacionConfig?.length !== 0) {
      this.ubicacionConfig[0].familias.map( (familia) => {
        if(familia.guardada !== null && this.categorias != null) {
          familia.productos.map( (productosFila: ProuctoCPDTO[]) => {
            console.log("PRODUCTOS FILA :: " + JSON.stringify(productosFila));
            productosFila.map( (producto) =>  {
              console.log("PRODUCTO :: " +  JSON.stringify(producto));
              if(producto !== null && this.productosTodos != null) {
                let productoEncontrado = this.productosTodos.find(prod => Number(prod.id) == producto.guardada);
                producto.nombre = productoEncontrado?.nombre;
                console.log("PRODUCTO NOMBRE :: " + producto.nombre);
                if(productoEncontrado?.idGrupoImagenes_imagenes != undefined && productoEncontrado?.idGrupoImagenes_imagenes.length > 0) {
                  console.log("PRODUCTO ENCONTRADO IMAGEN :: " + JSON.stringify(productoEncontrado?.idGrupoImagenes_imagenes[0]));
                  producto.imagen = localStorage.getItem(LocalStorageConstants.IMAGE_BASE_PATH) + productoEncontrado?.idGrupoImagenes_imagenes[0].ficheroUid + ".png";
                }
              }
              return producto;
            });
            return productosFila;
          });

          familia.subfamilias.map( (subfamilia ) => {
            subfamilia.productos.map( (productosFila: ProuctoCPDTO[]) => {
              console.log("PRODUCTOS FILA SF :: " + JSON.stringify(productosFila));
              productosFila.map( (producto) =>  {
                console.log("PRODUCTO SF :: " +  JSON.stringify(producto));
                if(producto !== null && this.productosTodos != null) {
                  let productoEncontrado = this.productosTodos.find(prod => Number(prod.id) == producto.guardada);
                  producto.nombre = productoEncontrado?.nombre;
                  console.log("PRODUCTO NOMBRE SF :: " + producto.nombre);
                  if(productoEncontrado?.idGrupoImagenes_imagenes != undefined && productoEncontrado?.idGrupoImagenes_imagenes.length > 0) {
                    console.log("PRODUCTO ENCONTRADO IMAGEN SF :: " + JSON.stringify(productoEncontrado?.idGrupoImagenes_imagenes[0]));
                    producto.imagen = localStorage.getItem(LocalStorageConstants.IMAGE_BASE_PATH) + productoEncontrado?.idGrupoImagenes_imagenes[0].ficheroUid + ".png";
                  }
                }
                return producto;
              });
              return productosFila;
            });
            return subfamilia;
          });
        }
        return familia;
      });
    }
  }

  recibirCategoriaSelecionada(idCategory: any) {
    console.log("MAIN _ SALE - CATEGORIA RECIBIDA :: " + idCategory);
    this.categoriaSelecionadaInput = idCategory;
    this.seleccionarFamilia();
  }

  seleccionarFamilia() {
    if(this.ubicacionConfig != undefined && this.ubicacionConfig?.length !== 0) {
      let familiaBuscada = this.ubicacionConfig[0].familias.find(familia => familia.id === this.categoriaSelecionadaInput);
      if (familiaBuscada) {
        console.log(familiaBuscada);
        this.subfamilias = familiaBuscada.subfamilias;
        this.productos = familiaBuscada.productos;

        console.log("SUBFAMILIAS :: " + this.subfamilias.find(subfamilia => subfamilia.guardada !== null));
        if(this.subfamilias.find(subfamilia => subfamilia.guardada !== null) !== undefined) {
          this.mostrarSubfamilias = true;
        } else {
          this.mostrarSubfamilias = false;
        }
      } else {
        console.log('No se encontró la familia');
      }
    }
  }

  recibirSubategoriaSelecionada(idSubcategory: any) {
    console.log("MAIN _ SALE - SUBCATEGORIA RECIBIDA :: " + idSubcategory);
    this.subcategoriaSelecionadaInput = idSubcategory;
    this.seleccionarSubfamilia();
  }

  seleccionarSubfamilia() {
    if(this.ubicacionConfig != undefined && this.ubicacionConfig?.length !== 0) {
      let familiaBuscada = this.ubicacionConfig[0].familias.find(familia => familia.id === this.categoriaSelecionadaInput);
      if (familiaBuscada) {
        console.log(familiaBuscada);
        let subfamiliaBuscada = familiaBuscada.subfamilias.find(subfamilia => subfamilia.id === this.subcategoriaSelecionadaInput);
        if (subfamiliaBuscada) {
          this.productos = subfamiliaBuscada.productos;
        }
      } else {
        console.log('No se encontró la familia');
      }
    }
  }

  
}
