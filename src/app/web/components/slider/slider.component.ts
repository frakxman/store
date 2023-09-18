import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  images: string[] = [
    'https://images.pexels.com/photos/1029598/pexels-photo-1029598.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/208698/pexels-photo-208698.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2861655/pexels-photo-2861655.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1029598/pexels-photo-1029598.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/208698/pexels-photo-208698.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2861655/pexels-photo-2861655.jpeg?auto=compress&cs=tinysrgb&w=600'
  ]

}
