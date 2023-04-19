import { GruposImagenesDTO } from "./gruposImagenes.dto";

export class ProductosDTO {
    id: string;
    codigo: string;
    descripcion: string;
    nombre: string | undefined;
    idGrupoImagenes_imagenes: GruposImagenesDTO[];
    precio: number;
  
    constructor(
        id: string,
        codigo: string,
        descripcion: string,
        nombre: string,
        idGrupoImagenes_imagenes: GruposImagenesDTO[]
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.idGrupoImagenes_imagenes = idGrupoImagenes_imagenes;
        this.precio = 0.0;
    }
  } 