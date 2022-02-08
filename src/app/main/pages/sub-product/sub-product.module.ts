import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubProductRoutingModule } from './sub-product-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    SubProductRoutingModule
  ]
})
export class SubProductModule { }
