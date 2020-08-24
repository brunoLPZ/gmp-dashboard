import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { StartComponent } from "./pages/start/start.component";
import { CommonModule } from "@angular/common";
import { WeeklyAccessComponent } from "./pages/weekly-accesses/weekly-accesses.component";
import { HistoricalAccessesComponent } from "./pages/historical-accesses/historical-accesses.component";
import { DetectionsTableComponent } from "./components/detections-table/detections-table.component";
import { LineChartComponent } from "./components/line-chart/line-chart.component";

@NgModule({
  declarations: [
    DashboardComponent,
    StartComponent,
    DetectionsTableComponent,
    WeeklyAccessComponent,
    HistoricalAccessesComponent,
    LineChartComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    CommonModule
  ],
  providers: [
  ]
})
export class DashboardModule { }
