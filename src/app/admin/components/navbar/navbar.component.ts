import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  activeMenu = false;

  constructor( private router: Router ) {}

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
 
}
