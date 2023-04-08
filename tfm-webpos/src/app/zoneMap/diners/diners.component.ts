import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DataDiners } from 'src/app/models/data-diners';

@Component({
  selector: 'app-diners',
  templateUrl: './diners.component.html',
  styleUrls: ['./diners.component.scss']
})
export class DinersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DinersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDiners,
  ) {}

  ngOnInit(): void {
    this.data.numDiners = 2;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  plus(): void {
    this.data.numDiners += 1;
  }

  minus(): void {
    if(this.data.numDiners > 0) {
      this.data.numDiners -= 1;
    }
  }

}
