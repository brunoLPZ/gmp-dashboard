import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from "./auth/app-auth-guard";

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AppAuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'contribute',
    canActivate: [AppAuthGuard],
    loadChildren: () => import('./modules/contribute/contribute.module').then(m => m.ContributeModule)
  },
  {
    path: '',
    canActivate: [AppAuthGuard],
    redirectTo: 'dashboard/start',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
