import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-move',
  templateUrl: './stock-move.component.html',
  styleUrls: ['./stock-move.component.scss']
})
export class StockMoveComponent implements OnInit {

  StockForm: FormGroup;

  StockList: Array<any> = [
    {
      id: 1,
      Product: "Test",
      SubProduct: "Sub text",
      Quantity: 1,
      UOM: "Pices",
      BatchNo: "Vendor",
      ExpDate: "18/12/2022",
    },
    {
      id:2,
      Product: "Test",
      SubProduct: "Sub text",
      Quantity: 1,
      UOM: "Pices",
      BatchNo: "Vendor",
      ExpDate: "18/12/2022",
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
      Product: [row['Product']],
      SubProduct: [row['SubProduct']],
      Quantity: [row['Quantity']],
      UOM: [row['UOM']],
      BatchNo: [row['BatchNo']],
      ExpDate: [row['ExpDate']]
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
          Product: [''],
          SubProduct: [''],
          Quantity: [''],
          UOM: [''],
          BatchNo: [''],
          ExpDate: ['']
        })
    );
    console.log( this.StockForm.value);
  }

}
