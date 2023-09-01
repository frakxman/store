import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb = inject( FormBuilder );
  private router = inject( Router );

  public loginForm: FormGroup = this.fb.group({
    user: ['', [ Validators.required, Validators.minLength(3)]],
    password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });


  login(){
    console.log(this.loginForm.value);
    this.loginForm.reset();
    this.router.navigate(['/auth/admin']);
  }

  register() {
    this.router.navigate(['/auth/register']);
  }
}
