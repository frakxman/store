import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './web/pages/error/error.component';

const routes: Routes = [
  { path: 'store', loadChildren: () => import('./web/web.module').then( m => m.WebModule ) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },
  { path: 'admin', canActivate: [ ], loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ) },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: 'store', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
