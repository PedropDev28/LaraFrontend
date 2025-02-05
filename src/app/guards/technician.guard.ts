import { CanActivateFn } from '@angular/router';

export const technicianGuard: CanActivateFn = (route, state) => {
  return true;
};
