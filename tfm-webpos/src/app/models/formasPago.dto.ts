import { ObjectComboFamiliasFPDTO } from "./objectComboFamiliasFP.dto";

export class FormasPagoDTO {
    id: string;
    codigo: string;
    descripcion: string;
    descripcionAbreviada: string | undefined;
    idFamilia_descripcion:  ObjectComboFamiliasFPDTO;
  
    constructor(
        id: string,
        codigo: string,
        descripcion: string,
        descripcionAbreviada: string,
        idFamilia_descripcion:  ObjectComboFamiliasFPDTO
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.descripcionAbreviada = descripcionAbreviada;
        this.idFamilia_descripcion = idFamilia_descripcion;
    }
  } 