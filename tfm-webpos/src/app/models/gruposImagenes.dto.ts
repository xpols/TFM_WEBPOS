export class GruposImagenesDTO {
    id: string;
    fichero: string;
    ficheroUid: string;
    orden: string;
    esPorDefecto: boolean;

    constructor(
        id: string,
        fichero: string,
        ficheroUid: string,
        orden: string,
        esPorDefecto: boolean
    ) {
        this.id = id;
        this.fichero = fichero;
        this.ficheroUid = ficheroUid;
        this.orden = orden;
        this.esPorDefecto = esPorDefecto;
    }
  } 