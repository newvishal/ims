import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "addEditUserRoleAccess",
    component: AddEditComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserRoleAccessModule { }
