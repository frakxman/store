import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '../services/token.service';

export const loginGuard: CanActivateFn = () => { 
  const tokenService = inject( TokenService );
  const router = inject( Router );
  
  const token = tokenService.getToken();
  console.log( token );
  if (token === undefined) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};



