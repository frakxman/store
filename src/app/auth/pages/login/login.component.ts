import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  token = '';

  public loginForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(3)]],
    password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });

  login(){
    const { username, password } = this.loginForm.value;
    this.authService.login( username, password )
      .subscribe( rta => {
        this.token = rta.access_token;
      });
    this.loginForm.reset();
    // this.router.navigate(['/admin/list']);
  }

  getProfile() {
    const userId: number = 0;
    this.authService.profile()
      .subscribe( rta => {
        console.log( rta );
      });
  }

  register() {
    this.router.navigate(['/auth/register']);
  }
}
