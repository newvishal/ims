import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.scss']
})
export class StockTransferComponent implements OnInit {

  StockForm: FormGroup;

  StockList: Array<any> = [
    {
      id: 1,
      ProductType: "Test",
      Subproduct: "Sub text",
      Quantity: 1,
      UOM: "Pices",
      BatchNo: "Vendor",
      ExpDate: "18/12/2022",
      Rate: "20",
      GST: "ABS676BACG",
      Amount: "50",
      NetAmount: "1000"
    },
    {
      id:2,
      ProductType: "Test",
      Subproduct: "Sub text",
      Quantity: 1,
      UOM: "Pices",
      BatchNo: "Vendor",
      ExpDate: "18/12/2022",
      Rate: "20",
      GST: "ABS676BACG",
      Amount: "50",
      NetAmount: "1000"
    }
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.CreateStockForm()
  }

  CreateStockForm() {
    let arr = [];
    for(let i = 0; i < this.StockList.length; i++) {
      arr.push(this.BuildFormDynamic(this.StockList[i]));
    }
    this.StockForm = this.fb.group({
      Stocks: this.fb.array(arr)
    });
  }

  BuildFormDynamic(row): FormGroup {
    return this.fb.group({
      id: [row['id']],
      ProductType: [row['ProductType']],
      Subproduct: [row['Subproduct']],
      BatchNo: [row['BatchNo']],
      ExpDate: [row['ExpDate']],
      Quantity: [row['Quantity']],
      UOM: [row['UOM']],
      Rate: [row['Rate']],
      GST: [row['GST']],
      Amount: [row['Amount']],
      NetAmount: [row['NetAmount']],
    });
  }

  get getStockForm() {
    return this.StockForm.controls;
  }

  get StockAliases() {
    return this.StockForm.get('Stocks') as FormArray;
  }

  DeleteStock(index) {
    this.StockAliases.removeAt(index);
  }
  
  
  addStock() {
    // this.BuildFormDynamic();
    this.StockAliases.push(
        this.fb.group({
          id: [''],
          ProductType: [''],
          Subproduct: [''],
          BatchNo: [''],
          ExpDate: [''],
          Quantity: [''],
          UOM: [''],
          Rate: [''],
          GST: [''],
          Amount: [''],
          NetAmount: [''],
        })
    );
    console.log( this.StockForm.value);
  }

}
