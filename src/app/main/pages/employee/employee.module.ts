import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { EmpDocListComponent } from './emp-doc-list/emp-doc-list.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ApplyLeaveListComponent } from './apply-leave-list/apply-leave-list.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    EmpDocListComponent,
    UploadDocComponent,
    ApplyLeaveComponent,
    ApplyLeaveListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
