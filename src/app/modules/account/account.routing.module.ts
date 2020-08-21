import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppAuthGuard } from "../../auth/app-auth-guard";
import { AccountDetailsComponent } from "./pages/account-details/account-details.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AppAuthGuard],
    children: [
      {
        path: '',
        component: AccountDetailsComponent
      },
      {
        path: 'details',
        component: AccountDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
