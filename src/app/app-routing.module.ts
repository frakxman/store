import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './web/pages/error/error.component';
import { loginGuard } from './auth/guards/auth.guard';
// import { authGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'store', loadChildren: () => import('./web/web.module').then( m => m.WebModule ) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ), canActivate: [ loginGuard ] },

  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: 'store', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// , canActivate: [ authGuard ], canMatch: [ canMatchGuard ] ,
