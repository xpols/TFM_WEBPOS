import { Injectable } from '@angular/core';
import { LocalStorageConstants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string|null {
    return localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN);
  }

  getRefreshToken(): string|null {
    return localStorage.getItem(LocalStorageConstants.REFRESH_TOKEN);
  }

  saveToken(token: string): void {
    localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(LocalStorageConstants.REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(LocalStorageConstants.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(LocalStorageConstants.REFRESH_TOKEN);
  }
}
