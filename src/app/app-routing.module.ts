import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'gmp',
    loadChildren: () => import('./modules/gmp/gmp.module').then(m => m.GmpModule)
  },
  {
    path: '',
    redirectTo: 'gmp/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
