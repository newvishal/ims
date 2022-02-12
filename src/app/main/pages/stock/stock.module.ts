import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStockComponent } from './add-stock/add-stock.component';

import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';

const routes: Routes = [
  {
    path: "",
    component: StockListComponent
  },
  {
    path: "AddStock",
    component: AddStockComponent
  }
];

@NgModule({
  declarations: [
    AddStockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StockModule { }
