import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrls: ['./add-po.component.scss']
})
export class AddPoComponent implements OnInit {
  POForm: FormGroup;

  StockList: Array<any> = [
    {
      id: 1,
      Product: "Test",
      SubProduct: "Sub text",
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
    this.POForm = this.fb.group({
      POItems: this.fb.array(arr)
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
      ExpDate: [row['ExpDate']],
      Rate: [row['Rate']],
      GST: [row['GST']],
      Amount: [row['Amount']],
      NetAmount: [row['NetAmount']],
    });
  }

  get getStockForm() {
    return this.POForm.controls;
  }

  get StockAliases() {
    return this.POForm.get('POItems') as FormArray;
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
          ExpDate: [''],
          Rate: [''],
          GST: [''],
          Amount: [''],
          NetAmount: [''],
        })
    );
    console.log( this.POForm.value);
  }
}
