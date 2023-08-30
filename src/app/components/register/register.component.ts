import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private fb = inject( FormBuilder );

  public registerForm: FormGroup = this.fb.group({
    user: ['', [ Validators.required, Validators.minLength(3)]],
    email: ['', [ Validators.required, Validators.email]],
    password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });

  register() {
    console.log(this.registerForm.value);
    this.registerForm.reset();
  }

}
