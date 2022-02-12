import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ForCclComponent } from './for-ccl/for-ccl.component';

const routes: Routes = [
  {
    path: "",
    component: ForCclComponent
  },
];


@NgModule({
  declarations: [
    ForCclComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LeaveModule { }
