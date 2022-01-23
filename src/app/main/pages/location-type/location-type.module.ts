import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationTypeRoutingModule } from './location-type-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    LocationTypeRoutingModule
  ]
})
export class LocationTypeModule { }
