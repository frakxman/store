import { Component } from '@angular/core';

import { Categories } from '../../interfaces/categories.interfaces';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  public categories: Categories[] = [];
  
  constructor( private categoriesServices: CategoriesService ) {}

  ngOnInit(): void {
      this.categoriesServices.getAllCategories()
        .subscribe( data => {
          this.categories = data;
        });
  }

}
