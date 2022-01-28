import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveLeaveRoutingModule } from './approve-leave-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ApproveLeaveRoutingModule
  ]
})
export class ApproveLeaveModule { }
