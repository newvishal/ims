import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ApplyLeaveListComponent } from './apply-leave-list/apply-leave-list.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { EmpDocListComponent } from './emp-doc-list/emp-doc-list.component';
import { ListComponent } from './list/list.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "addEditEmployee",
    component: AddEditComponent
  },
  {
    path: "doc-list",
    component: EmpDocListComponent
  },
  {
    path: "doc-upload/:empId",
    component: UploadDocComponent
  },
  {
    path:"apply-leave-list",
    component: ApplyLeaveListComponent
  },
  {
    path:"apply-leave",
    component: ApplyLeaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
