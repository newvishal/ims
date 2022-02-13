import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddAttendanceComponent } from './add-attendance/add-attendance.component';

const routes: Routes = [
  {
    path: "",
    component: AddAttendanceComponent
  }
];

@NgModule({
  declarations: [
    AddAttendanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MarkAttendanceModule { }
