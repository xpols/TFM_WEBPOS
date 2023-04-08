export class MesaDTO {
    id: string;
    idObjeto_nombre: object;
    idObjeto_url: object;
    alto: number;
    ancho: number;
    idZona_descripcion: object;
    nombre: string;
    posX: number;
    posY: number;
    idTicketAbierto: string | null;
    numDiners: number | undefined;

    constructor(
        id: string,
        idObjeto_nombre: object,
        idObjeto_url: object,
        alto: number,
        ancho: number,
        idZona_descripcion: object,
        nombre: string,
        posX: number,
        posY: number,
      ) {
        this.id = id;
        this.idObjeto_nombre = idObjeto_nombre;
        this.idObjeto_url = idObjeto_url;
        this.alto = alto;
        this.ancho = ancho;
        this.idZona_descripcion = idZona_descripcion;
        this.nombre = nombre;
        this.posX = posX;
        this.posY = posY;
        this.idTicketAbierto = null;
      }
} 