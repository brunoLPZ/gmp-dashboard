import { RouterModule, Routes } from "@angular/router";
import { AppAuthGuard } from "../../auth/app-auth-guard";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { StartComponent } from "./pages/start/start.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AppAuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'start',
        component: StartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
