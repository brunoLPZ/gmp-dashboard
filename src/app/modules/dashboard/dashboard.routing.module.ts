import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { StartComponent } from "./pages/start/start.component";
import { WeeklyAccessComponent } from "./pages/weekly-accesses/weekly-accesses.component";
import { HistoricalAccessesComponent } from "./pages/historical-accesses/historical-accesses.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StartComponent
      },
      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'weekly',
        component: WeeklyAccessComponent
      },
      {
        path: 'historical',
        component: HistoricalAccessesComponent
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
