import { RouterModule, Routes } from "@angular/router";
import { AppAuthGuard } from "../../auth/app-auth-guard";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { GmpComponent } from "./gmp.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AppAuthGuard],
    component: GmpComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmpRoutingModule {
}
