import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {

  @Output() searchProduct: EventEmitter<string>;

  constructor() {
    this.searchProduct = new EventEmitter();
  }

  searchTag( newTag: string ) {
    if ( newTag === '' ) return;
    let tag = newTag.trim().toLowerCase();
    this.searchProduct.emit( tag );
  }

}
