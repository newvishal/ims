import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConatinerComponent } from './conatiner/conatiner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: "",
    component: ConatinerComponent,
    children:[
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "state",
        loadChildren: () =>
          import("./pages/state/state.module").then((m) => m.StateModule)
      },
      {
        path: "district",
        loadChildren: () =>
          import("./pages/district/district.module").then((m) => m.DistrictModule)
      },
      {
        path: "location-type",
        loadChildren: () =>
          import("./pages/location-type/location-type.module").then((m) => m.LocationTypeModule)
      },
      {
        path: "location",
        loadChildren: () =>
          import("./pages/location/location.module").then((m) => m.LocationModule)
      },
      {
        path: "designation",
        loadChildren: () =>
          import("./pages/designation/designation.module").then((m) => m.DesignationModule)
      },
      {
        path: "bank",
        loadChildren: () =>
          import("./pages/bank/bank.module").then((m) => m.BankModule)
      },
      {
        path: "document-type",
        loadChildren: () =>
          import("./pages/document-type/document-type.module").then((m) => m.DocumentTypeModule)
      },
      {
        path: "service-type",
        loadChildren: () =>
          import("./pages/service-type/service-type.module").then((m) => m.ServiceTypeModule)
      },
      {
        path: "channel",
        loadChildren: () =>
          import("./pages/channel/channel.module").then((m) => m.ChannelModule)
      },
      {
        path: "leave-type",
        loadChildren: () =>
          import("./pages/leave-type/leave-type.module").then((m) => m.LeaveTypeModule)
      },
      {
        path: "leave-limit",
        loadChildren: () =>
          import("./pages/leave-limit/leave-limit.module").then((m) => m.LeaveLimitModule)
      },
      {
        path: "employee",
        loadChildren: () =>
          import("./pages/employee/employee.module").then((m) => m.EmployeeModule)
      },
      {
        path: "configuration",
        loadChildren: () =>
          import("./pages/configuration/configuration.module").then((m) => m.ConfigurationModule)
      },
      {
        path: "approve-leave",
        loadChildren: () =>
          import("./pages/approve-leave/approve-leave.module").then((m) => m.ApproveLeaveModule)
      },
      {
        path: "product",
        loadChildren: () =>
          import("./pages/product/product.module").then((m) => m.ProductModule)
      },
      {
        path: "sub-product",
        loadChildren: () =>
          import("./pages/sub-product/sub-product.module").then((m) => m.SubProductModule)
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./pages/reports/reports.module").then((m) => m.ReportsModule)
      },
      {
        path: "purchase-order",
        loadChildren: () =>
          import("./pages/purchase-order/purchase-order.module").then((m) => m.PurchaseOrderModule)
      },
      {
        path: "stock",
        loadChildren: () =>
          import("./pages/stock/stock.module").then((m) => m.StockModule)
      },
      {
        path: "poItem",
        loadChildren: () =>
          import("./pages/po-item/po-item.module").then((m) => m.POItemModule)
      },
      {
        path: "inventory",
        loadChildren: () =>
          import("./pages/inventory/inventory.module").then((m) => m.InventoryModule)
      },
      {
        path: "newBornLeave",
        loadChildren: () =>
          import("./pages/new-born-leave/new-born-leave.module").then((m) => m.NewBornLeaveModule)
      },
      {
        path: "leave",
        loadChildren: () =>
          import("./pages/leave/leave.module").then((m) => m.LeaveModule)
      },
      {
        path: "mark-attendance",
        loadChildren: () =>
          import("./pages/mark-attendance/mark-attendance.module").then((m) => m.MarkAttendanceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
