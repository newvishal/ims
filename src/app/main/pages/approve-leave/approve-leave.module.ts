import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ApproveLeaveRoutingModule } from './approve-leave-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ApproveLeaveRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ApproveLeaveModule { }
