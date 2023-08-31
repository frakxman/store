import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./web/web.module').then( m => m.WebModule ) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
