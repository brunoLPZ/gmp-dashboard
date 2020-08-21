import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from "./auth/app-auth-guard";
import { NotFoundComponent } from "./note-found/not-found.component";

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
    path: 'account',
    canActivate: [AppAuthGuard],
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'not-found',
    canActivate: [AppAuthGuard],
    component: NotFoundComponent
  },
  {
    path: '',
    canActivate: [AppAuthGuard],
    redirectTo: 'dashboard/start',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
