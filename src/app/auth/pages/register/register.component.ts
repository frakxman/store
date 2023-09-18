import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private fb = inject( FormBuilder );
  private router = inject( Router)
  private authService = inject( AuthService );

  public registerForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(3)]],
    email: ['', [ Validators.required, Validators.email]],
    password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });

  register() {
    console.log(this.registerForm.value);
    const { username, password, email } = this.registerForm.value;
    this.authService.register( username, password, email );
    this.router.navigate(['/auth/login']);
    this.registerForm.reset();
  }

}
