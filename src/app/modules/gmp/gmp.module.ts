import { GmpComponent } from "./gmp.component";
import { NgModule } from "@angular/core";
import { GmpRoutingModule } from "./gmp.routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    GmpComponent
  ],
  imports: [
    GmpRoutingModule,
    SharedModule
  ]
})
export class GmpModule { }
