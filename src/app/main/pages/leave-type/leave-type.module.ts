import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveTypeRoutingModule } from './leave-type-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    LeaveTypeRoutingModule
  ]
})
export class LeaveTypeModule { }
