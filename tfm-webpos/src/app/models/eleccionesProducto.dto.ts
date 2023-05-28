import { ObjectComboDTO } from "./objectCombo.dto";

export class EleccionesProductoDTO {
    id: string;
    idNombreEleccionProducto_nombre: ObjectComboDTO;
    idNombreEleccionProducto_seleccionesRecuento: ObjectComboDTO;
    idProducto_nombre: ObjectComboDTO;
    maxProdAElegir: number;
    minProdAElegir: number;
    orden: number;
    sonFijos: boolean;
    sonIngredientes: boolean;
    sonModificadores: boolean;
  
    constructor(
        id: string,
        idNombreEleccionProducto_nombre: ObjectComboDTO,
        idNombreEleccionProducto_seleccionesRecuento: ObjectComboDTO,
        idProducto_nombre: ObjectComboDTO,
        maxProdAElegir: number,
        minProdAElegir: number,
        orden: number,
        sonFijos: boolean,
        sonIngredientes: boolean,
        sonModificadores: boolean
    ) {
        this.id = id;
        this.idNombreEleccionProducto_nombre = idNombreEleccionProducto_nombre;
        this.idNombreEleccionProducto_seleccionesRecuento = idNombreEleccionProducto_seleccionesRecuento;
        this.idProducto_nombre = idProducto_nombre;
        this.maxProdAElegir = maxProdAElegir;
        this.minProdAElegir = minProdAElegir;
        this.orden = orden;
        this.sonFijos = sonFijos;
        this.sonIngredientes = sonIngredientes;
        this.sonModificadores = sonModificadores;
    }
  } 