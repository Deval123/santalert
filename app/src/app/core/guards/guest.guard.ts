import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Session } from '../services/session';

/**
 * Route `/login` : si une session est déjà active, on renvoie l'utilisateur
 * vers son écran d'accueil (patient → /profile, personnel → /profile-personel).
 */
export const guestGuard: CanActivateFn = () => {
  if (!Session.isLoggedIn) return true;
  const router = inject(Router);
  return router.createUrlTree([Session.isPatient ? '/profile' : '/profile-personel']);
};
