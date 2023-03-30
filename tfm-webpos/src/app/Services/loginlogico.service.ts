import { Injectable } from '@angular/core';

const DOMINIO_USUARIO = 'idDominioUsuario';
const IMAGE_BASE_PATH = 'imagenesWebBasePath';

@Injectable({
  providedIn: 'root'
})
export class LoginlogicoService {

  constructor() { }

  getDominio(): string|null {
    return localStorage.getItem(DOMINIO_USUARIO);
  }

  getImageBasePath(): string|null {
    return localStorage.getItem(IMAGE_BASE_PATH);
  }

  saveDominio(dominio: string): void {
    localStorage.setItem(DOMINIO_USUARIO, dominio);
  }

  saveImageBasePath(imageBasePath: string): void {
    localStorage.setItem(IMAGE_BASE_PATH, imageBasePath);
  }

  removeDominio(): void {
    localStorage.removeItem(DOMINIO_USUARIO);
  }

  removeImageBasePath(): void {
    localStorage.removeItem(IMAGE_BASE_PATH);
  }
}
