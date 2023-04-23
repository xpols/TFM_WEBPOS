import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private tableName = new BehaviorSubject<string|undefined>('');
  tableName$ = this.tableName.asObservable();

  private numDiners = new BehaviorSubject<number>(0);
  numDiners$ = this.numDiners.asObservable();

  setTableName(valor: string | undefined) {
    console.log("SET VALOR :: " + valor);
    this.tableName.next(valor);
  }

  setNumDiners(valor: number) {
    console.log("SET VALOR :: " + valor);
    this.numDiners.next(valor);
  }

  constructor() { }
}
