import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { StartComponent } from "./pages/start/start.component";
import { WeeklyAccessComponent } from "./pages/weekly-accesses/weekly-accesses.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'weekly',
        component: WeeklyAccessComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
