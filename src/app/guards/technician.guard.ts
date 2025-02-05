import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { DbService } from '../core/db.service';
import { firstValueFrom } from 'rxjs';

export const technicianGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const dbService = inject(DbService);
  const router = inject(Router);
  
  let token = localStorage.getItem('token');
  
  if (!token) {
    router.navigate(['/']);
    return false;
  }

  try {
    const response = await firstValueFrom(dbService.getCurrentUser()); // Esperamos la respuesta

    console.log('Usuario autenticado:', response);
    authService.setUsuario(response);

    if (response.rol === 'cliente') {
      router.navigate(['/inicioCliente']);      
    } else if (response.rol === 'tecnico') {
      return true;
    } else if (response.rol === 'admin') {
      router.navigate(['/inicioAdmin']);
    } else {
      router.navigate(['/']);
    }
    return false;
  } catch (err) {
    console.error('Error al recuperar usuario:', err);
    router.navigate(['/']);
    return false;
  }
};
