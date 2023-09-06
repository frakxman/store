import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './web/pages/error/error.component';
import { authGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'store', loadChildren: () => import('./web/web.module').then( m => m.WebModule ) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },
<<<<<<< HEAD
  { path: 'admin', canActivate: [ authGuard ], canMatch: [ canMatchGuard ], loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ) },
=======
  { path: 'admin', canActivate: [ ], loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ) },
>>>>>>> 7b4489148d9eaa7f581465779fa176b933f958ba
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: 'store', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
