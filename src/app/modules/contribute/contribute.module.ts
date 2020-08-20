import { NgModule } from "@angular/core";
import { ContributeComponent } from "./contribute.component";
import { ContributeRoutingModule } from "./contribute.routing.module";
import { SharedModule } from "../shared/shared.module";
import { SuggestComponent } from "./pages/suggest/suggest.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [
    ContributeComponent,
    SuggestComponent
  ],
  imports: [
    ContributeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
  ]
})
export class ContributeModule { }
