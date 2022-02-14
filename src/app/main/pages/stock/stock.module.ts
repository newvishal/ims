import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStockComponent } from './add-stock/add-stock.component';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { StockReceivedComponent } from './stock-received/stock-received.component';
import { StockMoveComponent } from './stock-move/stock-move.component';

const routes: Routes = [
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
  },
  {
    path: "StockMove",
    component: StockMoveComponent
  }
];

@NgModule({
  declarations: [
    AddStockComponent,
    StockTransferComponent,
    StockReceivedComponent,
    StockMoveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class StockModule { }
