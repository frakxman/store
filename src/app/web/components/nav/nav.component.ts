import { Component, OnInit } from '@angular/core';

import { StoreService } from 'src/app/web/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;

  constructor( private storeService: StoreService ) {};

  ngOnInit(): void {
      this.storeService.myCart$
        .subscribe( products => {
          this.counter = products.reduce(( sum, item ) => {
            return sum + item.store }, 0);
        });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
