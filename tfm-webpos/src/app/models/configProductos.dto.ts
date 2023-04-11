import { GruposImagenesDTO } from "./gruposImagenes.dto";

export class ConfigProductosDTO {
    familias: FamiliasCPDTO[]
    medidas: MedidaCPDTO;

    constructor(
        familias: FamiliasCPDTO[],
        medidas: MedidaCPDTO
      ) {
        this.familias = familias;
        this.medidas = medidas;
    }
} 

export class FamiliasCPDTO {
    id: string;
    nombre: string | undefined;
    guardada: number;
    productos: ProuctoCPDTO[][];
    subfamilias: SubfamiliasCPDTO[];
    imagen: string | undefined;

    constructor(
        id: string,
        nombre: string,
        guardada: number,
        productos: ProuctoCPDTO[][],
        subfamilias: SubfamiliasCPDTO[]
      ) {
        this.id = id;
        this.nombre = nombre;
        this.guardada = guardada;
        this.productos = productos;
        this.subfamilias = subfamilias;
    }
}

export class SubfamiliasCPDTO {
    id: string;
    nombre: string;
    guardada: number;
    productos: ProuctoCPDTO[][];

    constructor(
        id: string,
        nombre: string,
        guardada: number,
        productos: ProuctoCPDTO[][]
      ) {
        this.id = id;
        this.nombre = nombre;
        this.guardada = guardada;
        this.productos = productos;
    }
}

export class ProuctoCPDTO {
    id: string;
    nombre: string;
    guardada: number;

    constructor(
        id: string,
        nombre: string,
        guardada: number
      ) {
        this.id = id;
        this.nombre = nombre;
        this.guardada = guardada;
    }
}

export class MedidaCPDTO {
    id: string;
    columnas: number;
    filas: number;
    filasFamilias: number;
    filasSubfamilias: number;
    mostrarSubfamilias: boolean;

    constructor(
        id: string,
        columnas: number,
        filas: number,
        filasFamilias: number,
        filasSubfamilias: number,
        mostrarSubfamilias: boolean
      ) {
        this.id = id;
        this.columnas = columnas;
        this.filas = filas;
        this.filasFamilias = filasFamilias;
        this.filasSubfamilias = filasSubfamilias;
        this.mostrarSubfamilias = mostrarSubfamilias;
    }
}