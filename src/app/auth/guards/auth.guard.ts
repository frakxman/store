import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
<<<<<<< HEAD
import { Observable, tap } from 'rxjs';
=======
import { Observable } from 'rxjs';
>>>>>>> 7b4489148d9eaa7f581465779fa176b933f958ba
import { AuthService } from '../services/auth.service';


const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject( AuthService );
  const router: Router = inject( Router );

<<<<<<< HEAD
  // return  true;
  return authService.checkAuthentication()
  .pipe(
      tap( isAuthenticated => console.log('Authenticated', isAuthenticated )),
      tap((isAuthenticated) => {
          if (!isAuthenticated) {
              router.navigate(['/auth/login']);
          }
      })
  );
=======
  return  true;
  // authService.checkAuthentication()
  // .pipe(
  //     tap( isAuthenticated => console.log('Authenticated', isAuthenticated )),
  //     tap((isAuthenticated) => {
  //         if (!isAuthenticated) {
  //             router.navigate(['/auth/login']);
  //         }
  //     })
  // );
>>>>>>> 7b4489148d9eaa7f581465779fa176b933f958ba
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('CanActivate');
  console.log({ route, state });
  
  return checkAuthStatus();
};

<<<<<<< HEAD
export const canMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
=======
export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
  ) => {
>>>>>>> 7b4489148d9eaa7f581465779fa176b933f958ba
  console.log('CanMatch');
  console.log({ route, segments });
  
  return checkAuthStatus();
};
