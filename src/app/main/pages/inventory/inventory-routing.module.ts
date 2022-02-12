import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplyDetailListComponent } from './supply-detail/supply-detail-list/supply-detail-list.component';
import { AddEditVendorBranchComponent } from './vendor-branch/add-edit-vendor-branch/add-edit-vendor-branch.component';
import { VendorBranchListComponent } from './vendor-branch/vendor-branch-list/vendor-branch-list.component';
import { AddEditComponent } from './vendor-reg/add-edit/add-edit.component';
import { ListComponent } from './vendor-reg/list/list.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "addEditVendorReg",
    component: AddEditComponent
  },
  {
    path: "addEditVendorBranchList",
    component: VendorBranchListComponent
  },
  {
    path: "addEditVendorBranch",
    component: AddEditVendorBranchComponent
  },
  {
    path: "supplyDetailList",
    component: SupplyDetailListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
