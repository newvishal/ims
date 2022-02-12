import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  StockForm: FormGroup;

  StockList: Array<any> = [
    {
      id: 1,
      ProductType: "Test",
      Subproduct: "Sub text",
      VendorId: "Vendor",
      VendorBranch: "V Branch",
      Quantity: 1,
      BacthNo: "BATCH243243",
      ExpDate:"12-08-2022",
      UOM: "Pices",
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
      VendorId: [row['VendorId']],
      VendorBranch: [row['VendorBranch']],
      Quantity: [row['Quantity']],
      BacthNo: [row['BacthNo']],
      ExpDate: [row['ExpDate']],
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
          VendorId: [''],
          VendorBranch: [''],
          Quantity: [''],
          BacthNo:[''],
          ExpDate:[''],
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


