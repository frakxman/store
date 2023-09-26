import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor( private tokenService: TokenService, private router: Router ) {}

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}
