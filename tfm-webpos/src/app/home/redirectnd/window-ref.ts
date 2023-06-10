import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRef {
  get nativeWindow(): any {
    return getWindow();
  }

  open(url: string, target: string): void {
    this.nativeWindow.open(url, target);
  }
}
