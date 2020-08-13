import { GmpComponent } from "./gmp.component";
import { NgModule } from "@angular/core";
import { GmpRoutingModule } from "./gmp.routing.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    GmpComponent,
    DashboardComponent
  ],
  imports: [
    GmpRoutingModule,
    SharedModule
  ]
})
export class GmpModule { }
