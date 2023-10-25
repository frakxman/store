import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Output() pageSelected: EventEmitter<number>;

  page = 1;
  limit = 10;

  constructor() {
    this.pageSelected = new EventEmitter();
  }

  updateUnitProduct( operation: string ) {
    if( operation === 'minus' && this.page > 1 ) {
      this.page--;
      this.pageSelected.emit( this.page );
    }
    if( operation === 'plus' ) {
      this.page++;
      this.pageSelected.emit( this.page );
    }
  }

}
