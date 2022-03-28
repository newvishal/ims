import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "addEditApplicationPage",
    component: AddEditComponent
  }
];

@NgModule({
  declarations: [
    AddEditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ApplicationPagesModule { }
