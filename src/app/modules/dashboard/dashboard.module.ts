import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { StartComponent } from "./pages/start/start.component";
import { DetectionsTableComponent } from "./detections-table/detections-table.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DashboardComponent,
    StartComponent,
    DetectionsTableComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class DashboardModule { }
