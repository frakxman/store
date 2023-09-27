import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

import { UserResp } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private tokenService = inject( TokenService );
  private router = inject( Router );

  private user?: UserResp;

  public loginForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(3)]],
    password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });

  get currentUser():UserResp|undefined {
    if( !this.user ) return undefined;
    return structuredClone( this.user )
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.authService.login( username, password ).pipe(
      tap( resp => {
        this.user = resp;
      })
    )
    .subscribe( resp => {
      if( resp.access_token ) {
      this.tokenService.saveToken(resp.access_token);
      this.router.navigate(['/admin/list']);
      } else {
        console.log('User error');
        Swal.fire({
          title: 'Error!',
          text: 'Usuario y/o Contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar de Nuevo'
        })
        this.router.navigate(['/auth/login']);
      }
    });
    this.loginForm.reset();
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  
}
