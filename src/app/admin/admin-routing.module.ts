import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
import { EditComponent } from './pages/edit/edit.component';
import { ImgComponent } from './pages/img/img.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'list', component: ProductsComponent },
    { path: 'edit', component: EditComponent },
    { path: 'img', component: ImgComponent }
  ]}
=======
const routes: Routes = [
  { path: '',}
>>>>>>> 7b4489148d9eaa7f581465779fa176b933f958ba
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
