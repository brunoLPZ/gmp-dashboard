import { RouterModule, Routes } from "@angular/router";
import { AppAuthGuard } from "../../auth/app-auth-guard";
import { GmpComponent } from "./gmp.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    canActivate: [AppAuthGuard],
    children: [
      {
        path: '',
        component: GmpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmpRoutingModule {}
