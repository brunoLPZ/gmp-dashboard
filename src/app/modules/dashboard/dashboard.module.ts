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
import { ResizeObserverDirective } from "./directives/resize-observer.directive";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { PieChartComponent } from "./components/pie-chart/pie-chart.component";

@NgModule({
  declarations: [
    DashboardComponent,
    StartComponent,
    DetectionsTableComponent,
    WeeklyAccessComponent,
    HistoricalAccessesComponent,
    LineChartComponent,
    ResizeObserverDirective,
    BarChartComponent,
    PieChartComponent
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
