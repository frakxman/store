import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'assets/logo_celulares.png';

  imgError() {
    this.img = this.imageDefault;
  }

}
