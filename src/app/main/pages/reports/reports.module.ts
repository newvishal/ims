import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceComponent } from './attendance/attendance.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
const routes: Routes = [
  {
    path: "attendance",
    component: AttendanceComponent
  }
];

@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportsModule { }
