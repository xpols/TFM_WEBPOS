import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainSalesService } from 'src/app/Services/main-sales.service';
import { SharedService } from 'src/app/Services/shared.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { CategoriasDTO } from 'src/app/models/categorias.dto';
import { ConfigProductosDTO, FamiliasCPDTO, ProuctoCPDTO, SubfamiliasCPDTO } from 'src/app/models/configProductos.dto';
import { GruposImagenesDTO } from 'src/app/models/gruposImagenes.dto';
import { ProductosDTO } from 'src/app/models/productos.dto';
import { TarifasVentaDTO } from 'src/app/models/tarifasVenta.dto';
import { TarifasVentaPreciosDTO } from 'src/app/models/tarifasVentaPrecios.dto';
import { UbicacionDTO } from 'src/app/models/ubicacion.dto';
import { UbicacionesDTO } from 'src/app/models/ubicaciones.dto';

@Component({
  selector: 'main-sales',
  templateUrl: './main-sales.component.html',
  styleUrls: ['./main-sales.component.scss']
})
export class MainSalesComponent implements OnInit {

  tableTicketId: string | undefined;
  numDiners: number = 0;
  tableId: string | undefined;
  tableName: string | undefined;
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

  tarifa: TarifasVentaDTO | undefined;
  filteredTarifasArray: TarifasVentaDTO[] | undefined;
  precios: TarifasVentaPreciosDTO[] | undefined;

  isLoadingResults = false;

  constructor(private route: ActivatedRoute, private mainSalesService: MainSalesService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        console.log("PARAMS :: " + JSON.stringify(params));
        this.tableTicketId = params["tableTicketId"];
        this.numDiners = params["numDiners"];
        this.tableId = params["tableId"];
        this.tableName = params["tableName"];
        
        this.loadConfigUbicacion();
      }
    );
  }

  ngAfterViewInit() {
    console.log("PONEMOS VALOR :: " + this.tableName);
    this.sharedService.setTableName(this.tableName);
    this.sharedService.setNumDiners(this.numDiners);
  }

  private async loadConfigUbicacion(): Promise<void> {
    this.isLoadingResults = true;
    let errorResponse: any;
    try {
      this.ubicaciones = await this.mainSalesService.getUbicaciones(localStorage.getItem(LocalStorageConstants.CODIGO_TIENDA));
      if(this.ubicaciones !== undefined && this.ubicaciones?.length !== 0) {
        this.ubicacion = await this.mainSalesService.getUbicacion(this.ubicaciones[0].id);
        if(this.ubicacion !== undefined) {
          this.ubicacionConfig = await this.mainSalesService.getRecuperarConfiguracion(this.ubicacion.idMedida.id, this.ubicaciones[0].id);
          await this.loadCategories();
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
        await this.loadTarifas();
        console.log("TARIFA CARGADA :: " + this.tarifa?.id);
        this.matchProducts();
        this.isLoadingResults = false;
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private async loadTarifas(): Promise<void> {
    let errorResponse: any;
    try {
      let idDominio = localStorage.getItem(LocalStorageConstants.DOMINIO_USUARIO);
      let codigoTienda = localStorage.getItem(LocalStorageConstants.CODIGO_TIENDA);
      if(idDominio != undefined) {
        let tarifasTodas = await this.mainSalesService.getTarifas(idDominio, codigoTienda);
        if(tarifasTodas != undefined) {
          const fechaNow = new Date();
          this.filteredTarifasArray = tarifasTodas.filter(tarifa => {
            return (fechaNow >= this.convertirFecha(tarifa.fechaInicial) && (tarifa.fechaFinal == null || tarifa.fechaFinal == undefined || fechaNow <= this.convertirFecha(tarifa.fechaFinal) )) ? tarifa : null; //;
          });
          this.tarifa = this.filteredTarifasArray[0];
          await this.loadPrecios(idDominio, this.tarifa.id);
        }
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private async loadPrecios(idDominio: string, idTarifa: string): Promise<void> {
    this.precios = await this.mainSalesService.getTarifaPrecios(idDominio, idTarifa);
  }

  convertirFecha(fechaString: string): Date {
    const partes = fechaString.split(" ");
    const fechaPartes = partes[0].split("/");
    const horaPartes = partes[1].split(":");
    const fecha = new Date(Number(fechaPartes[2]), Number(fechaPartes[1]) - 1, Number(fechaPartes[0]), Number(horaPartes[0]), Number(horaPartes[1]));
    console.log("FECHA STRING :: " + fechaString);
    console.log("FECHA CONVERTIDA :: " + fecha);
    return fecha;
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
            //console.log("PRODUCTOS FILA :: " + JSON.stringify(productosFila));
            productosFila.map( (producto) =>  {
              //console.log("PRODUCTO :: " +  JSON.stringify(producto));
              if(producto !== null && this.productosTodos != null) {
                let productoEncontrado = this.productosTodos.find(prod => Number(prod.id) == producto.guardada);
                producto.nombre = productoEncontrado?.nombre;
                producto.precio = this.findProductPrice(producto.guardada);
                //console.log("PRODUCTO NOMBRE :: " + producto.nombre);
                if(productoEncontrado?.idGrupoImagenes_imagenes != undefined && productoEncontrado?.idGrupoImagenes_imagenes.length > 0) {
                  //console.log("PRODUCTO ENCONTRADO IMAGEN :: " + JSON.stringify(productoEncontrado?.idGrupoImagenes_imagenes[0]));
                  producto.imagen = localStorage.getItem(LocalStorageConstants.IMAGE_BASE_PATH) + productoEncontrado?.idGrupoImagenes_imagenes[0].ficheroUid + ".png";
                }
              }
              return producto;
            });
            return productosFila;
          });

          familia.subfamilias.map( (subfamilia ) => {
            subfamilia.productos.map( (productosFila: ProuctoCPDTO[]) => {
              //console.log("PRODUCTOS FILA SF :: " + JSON.stringify(productosFila));
              productosFila.map( (producto) =>  {
                //console.log("PRODUCTO SF :: " +  JSON.stringify(producto));
                if(producto !== null && this.productosTodos != null) {
                  let productoEncontrado = this.productosTodos.find(prod => Number(prod.id) == producto.guardada);
                  producto.nombre = productoEncontrado?.nombre;
                  producto.precio = this.findProductPrice(producto.guardada);
                  //console.log("PRODUCTO NOMBRE SF :: " + producto.nombre);
                  if(productoEncontrado?.idGrupoImagenes_imagenes != undefined && productoEncontrado?.idGrupoImagenes_imagenes.length > 0) {
                    //console.log("PRODUCTO ENCONTRADO IMAGEN SF :: " + JSON.stringify(productoEncontrado?.idGrupoImagenes_imagenes[0]));
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

  private findProductPrice(idProduct: number): string | undefined {
    if(idProduct != null && idProduct != undefined) {
      let productoEncontrado = this.precios?.find(precio => {
        return Number(precio.idProducto_nombre.id) == idProduct;
      });
      return productoEncontrado?.precioGrupo_1.toFixed(2) + "€";
    } else {
      return undefined;
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

  ngOnDestroy() {
    this.sharedService.setTableName(undefined);
    console.log('Componente destruido');
  }

  
}
