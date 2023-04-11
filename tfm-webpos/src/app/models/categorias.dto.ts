import { GruposImagenesDTO } from "./gruposImagenes.dto";

export class CategoriasDTO {
    id: string;
    codigo: string;
    descripcion: string;
    nombre: string | undefined;
    orden: string;
    esFamiliaFavoritos: boolean;
    esFamiliaObsoletos: boolean;
    esFamiliaPorDefecto: boolean;
    esPromocionDirecta: boolean;
    mostrarPlusMenus: boolean;
    idGrupoImagenes_imagenes: GruposImagenesDTO[];
  
    constructor(
        id: string,
        codigo: string,
        descripcion: string,
        nombre: string,
        orden: string,
        esFamiliaFavoritos: boolean,
        esFamiliaObsoletos: boolean,
        esFamiliaPorDefecto: boolean,
        esPromocionDirecta: boolean,
        mostrarPlusMenus: boolean,
        idGrupoImagenes_imagenes: GruposImagenesDTO[]
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.orden = orden;
        this.esFamiliaFavoritos = esFamiliaFavoritos;
        this.esFamiliaObsoletos = esFamiliaObsoletos;
        this.esFamiliaPorDefecto = esFamiliaPorDefecto;
        this.esPromocionDirecta = esPromocionDirecta;
        this.mostrarPlusMenus = mostrarPlusMenus;
        this.idGrupoImagenes_imagenes = idGrupoImagenes_imagenes;
    }
  } 