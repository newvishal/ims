import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ConatinerComponent } from './conatiner/conatiner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './pages/state/list/list.component';
import { AddEditComponent } from './pages/state/add-edit/add-edit.component';


@NgModule({
  declarations: [
    ConatinerComponent,
    DashboardComponent,
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
