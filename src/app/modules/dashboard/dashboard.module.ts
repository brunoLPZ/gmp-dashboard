import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { StartComponent } from "./pages/start/start.component";
import { DetectionsTableComponent } from "./detections-table/detections-table.component";
import { CommonModule } from "@angular/common";
import { WeeklyAccessComponent } from "./pages/weekly-accesses/weekly-accesses.component";
import { HistoricalAccessesComponent } from "./pages/historical-accesses/historical-accesses.component";

@NgModule({
  declarations: [
    DashboardComponent,
    StartComponent,
    DetectionsTableComponent,
    WeeklyAccessComponent,
    HistoricalAccessesComponent
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
