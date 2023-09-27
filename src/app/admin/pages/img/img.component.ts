import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  private fb = inject( FormBuilder );

  public uploadImgForm: FormGroup = this.fb.group({
    id: ['', [ Validators.required ]],
    url: ['', [ Validators.required ]],
  });

  uploadImg( id: number ) {
    console.log( this.uploadImgForm.value);
    this.uploadImgForm.reset();
  }

}
