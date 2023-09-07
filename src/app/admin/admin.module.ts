import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { EditComponent } from './pages/edit/edit.component';
import { ImgComponent } from './pages/img/img.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ProductsComponent,
    EditComponent,
    ImgComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
