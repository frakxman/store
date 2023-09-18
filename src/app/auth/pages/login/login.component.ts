import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private tokeService = inject( TokenService );
  private router = inject( Router );
  private token = '';

  public loginForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(3)]],
    password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });

  login(){
    const { username, password } = this.loginForm.value;
    this.authService.login( username, password )
      .subscribe( resp => {
        this.token = resp.access_token;
        this.tokeService.saveToken( this.token );
      });
    console.log('Login works!!!');
    this.loginForm.reset();
    this.router.navigate(['/admin/list']);
  }

  register() {
    this.router.navigate(['/auth/register']);
  }
}
