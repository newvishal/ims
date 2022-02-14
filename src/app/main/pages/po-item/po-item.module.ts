import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPoComponent } from './add-po/add-po.component';

const routes: Routes = [
  {
    path: "",
    component: AddPoComponent
  },
];

@NgModule({
  declarations: [
    AddPoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class POItemModule { }
