export class ZonaMesasDTO {
  id: string;
  codigo: string;
  descripcion: string;
  idTienda_descripcion: object;
  selected: boolean;

  constructor(
    id: string,
    codigo: string,
    descripcion: string,
    idTienda_descripcion: object
  ) {
    this.id = id;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.idTienda_descripcion = idTienda_descripcion;
    this.selected = false;
  }
} 