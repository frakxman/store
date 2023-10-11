import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { register } from 'swiper/element/bundle';
register();

import { WebRoutingModule } from './web-routing.module';

import { ImgComponent } from './components/img/img.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { SliderComponent } from './components/slider/slider.component';

import { CategoriesComponent } from './pages/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { ErrorComponent } from './pages/error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerComponent } from './components/customer/customer.component';
import { InfoComponent } from './pages/info/info.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ImgComponent,
    NavComponent,
    PaginatorComponent,
    SearcherComponent,
    SliderComponent,
    CategoriesComponent,
    ErrorComponent,
    CartComponent,
    ProductComponent,
    ProductsComponent,
    FooterComponent,
    CustomerComponent,
    InfoComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ProductComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WebModule { }
