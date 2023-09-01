import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { register } from 'swiper/element/bundle';
register();

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SliderComponent } from './components/slider/slider.component';
import { CartComponent } from './components/cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    PaginatorComponent,
    SearcherComponent,
    CategoriesComponent,
    SliderComponent,
    CartComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
