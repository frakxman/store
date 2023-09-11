import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';


const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject( AuthService );
  const router: Router = inject( Router );

  return authService.userAuhtenticated()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated', isAuthenticated )),
      tap((isAuthenticated) => {
          if (!isAuthenticated) {
              router.navigate(['/auth/login']);
          }
      })
    );
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // console.log('CanActivate');
  // console.log({ route, state });
  
  return checkAuthStatus();
};


export const canMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
//   // console.log('CanMatch');
//   // console.log({ route, segments });
  
  return checkAuthStatus();
};