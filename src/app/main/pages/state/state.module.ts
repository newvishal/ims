import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    path: "addEditState",
    component: AddEditComponent
  }
];

@NgModule({
  declarations: [AddEditComponent,ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class StateModule { }
