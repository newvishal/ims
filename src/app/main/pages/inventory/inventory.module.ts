import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { ListComponent } from './vendor-reg/list/list.component';
import { AddEditComponent } from './vendor-reg/add-edit/add-edit.component';
import { VendorBranchListComponent } from './vendor-branch/vendor-branch-list/vendor-branch-list.component';
import { AddEditVendorBranchComponent } from './vendor-branch/add-edit-vendor-branch/add-edit-vendor-branch.component';
import { SupplyDetailListComponent } from './supply-detail/supply-detail-list/supply-detail-list.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    VendorBranchListComponent,
    AddEditVendorBranchComponent,
    SupplyDetailListComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule
  ]
})
export class InventoryModule { }
