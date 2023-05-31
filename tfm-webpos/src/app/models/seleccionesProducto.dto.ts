import { ObjectComboDTO } from "./objectCombo.dto";

export class SeleccionesProductoDTO {
    id: string;
    idEleccionProducto_idNombreEleccionProducto_nombre: number;
    idProductoSeleccionado_nombre: ObjectComboDTO;
    activaConfiguracion: boolean;
    esSuplemento: boolean;
    orden: number;
    cantidadSeleccionada: number = 0;
  
    constructor(
        id: string,
        idEleccionProducto_idNombreEleccionProducto_nombre: number,
        idProductoSeleccionado_nombre: ObjectComboDTO,
        activaConfiguracion: boolean,
        esSuplemento: boolean,
        orden: number
    ) {
        this.id = id;
        this.idEleccionProducto_idNombreEleccionProducto_nombre = idEleccionProducto_idNombreEleccionProducto_nombre;
        this.idProductoSeleccionado_nombre = idProductoSeleccionado_nombre;
        this.activaConfiguracion = activaConfiguracion;
        this.esSuplemento = esSuplemento;
        this.orden = orden;
    }
  } 