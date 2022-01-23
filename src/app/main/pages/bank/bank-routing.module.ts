import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "addEditBank",
    component: AddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
