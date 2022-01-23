import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTypeRoutingModule } from './service-type-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    ServiceTypeRoutingModule
  ]
})
export class ServiceTypeModule { }
