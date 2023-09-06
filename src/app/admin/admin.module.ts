import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditComponent } from './pages/edit/edit.component';
<<<<<<< HEAD
import { ImgComponent } from './pages/img/img.component';
=======
>>>>>>> 7b4489148d9eaa7f581465779fa176b933f958ba


@NgModule({
  declarations: [
    LayoutComponent,
    ProductsComponent,
<<<<<<< HEAD
    EditComponent,
    ImgComponent
=======
    EditComponent
>>>>>>> 7b4489148d9eaa7f581465779fa176b933f958ba
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
