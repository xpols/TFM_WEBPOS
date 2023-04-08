import { Injectable } from '@angular/core';
import { LocalStorageConstants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginlogicoService {

  constructor() { }

  getDominio(): string|null {
    return localStorage.getItem(LocalStorageConstants.DOMINIO_USUARIO);
  }

  getImageBasePath(): string|null {
    return localStorage.getItem(LocalStorageConstants.IMAGE_BASE_PATH);
  }

  saveDominio(dominio: string): void {
    localStorage.setItem(LocalStorageConstants.DOMINIO_USUARIO, dominio);
  }

  saveImageBasePath(imageBasePath: string): void {
    localStorage.setItem(LocalStorageConstants.IMAGE_BASE_PATH, imageBasePath);
  }

  removeDominio(): void {
    localStorage.removeItem(LocalStorageConstants.DOMINIO_USUARIO);
  }

  removeImageBasePath(): void {
    localStorage.removeItem(LocalStorageConstants.IMAGE_BASE_PATH);
  }
}
