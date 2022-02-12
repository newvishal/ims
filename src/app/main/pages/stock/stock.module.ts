import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStockComponent } from './add-stock/add-stock.component';

import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { StockReceivedComponent } from './stock-received/stock-received.component';

const routes: Routes = [
  {
    path: "",
    component: StockListComponent
  },
  {
    path: "AddStock",
    component: AddStockComponent
  },
  {
    path: "StockTransfer",
    component: StockTransferComponent
  },
  {
    path: "StockReceived",
    component: StockReceivedComponent
  }
];

@NgModule({
  declarations: [
    AddStockComponent,
    StockTransferComponent,
    StockReceivedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class StockModule { }
