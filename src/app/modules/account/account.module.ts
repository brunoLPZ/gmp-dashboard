import { NgModule } from "@angular/core";
import { AccountDetailsComponent } from "./pages/account-details/account-details.component";
import { AccountRoutingModule } from "./account.routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    AccountDetailsComponent
  ],
  imports: [
    AccountRoutingModule,
    SharedModule
  ],
  providers: [
  ]
})
export class AccountModule { }
