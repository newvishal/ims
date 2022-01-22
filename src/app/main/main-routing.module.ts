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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
