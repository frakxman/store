import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';

import { Categories } from '../interfaces/categories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string = environments.baseUrl

  constructor( private http: HttpClient) { }

  // Get all categories
  getAllCategories() {
    return this.http.get<Categories[]>(`${ this.baseUrl }/categories?page=1&limit=10`);     
  }
}
