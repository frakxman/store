import { HttpClient, HttpParams } from '@angular/common/http';
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
  getAllCategories( page: number, limit: number ) {
    let params = new HttpParams();
    if ( page && limit ) {
      params = params.set('page', page);
      params = params.set('limit', limit);
    }
    return this.http.get<Categories[]>(`${ this.baseUrl }/categories`, { params });     
  }
}
