import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataPayments } from 'src/app/models/data-payments';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataPayments,
  ) {}

  ngOnInit(): void {
    this.data.total = 2;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
