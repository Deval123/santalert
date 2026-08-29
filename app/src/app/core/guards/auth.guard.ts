import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Session } from '../services/session';

/** Bloque l'accès aux pages protégées si aucune session n'est active. */
export const authGuard: CanActivateFn = () => {
  if (Session.isLoggedIn) return true;
  return inject(Router).createUrlTree(['/login']);
};
