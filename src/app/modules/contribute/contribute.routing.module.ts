import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ContributeComponent } from "./contribute.component";
import { SuggestComponent } from "./pages/suggest/suggest.component";
import { AppAuthGuard } from "../../auth/app-auth-guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AppAuthGuard],
    children: [
      {
        path: '',
        component: ContributeComponent
      },
      {
        path: 'suggest',
        component: SuggestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributeRoutingModule {
}
