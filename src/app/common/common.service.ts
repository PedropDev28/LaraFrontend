import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  aceptadoConsetimiento = signal(false);
  isLoogeado = signal(false);
  nombre = signal('');

  setLoginState(isLoggedIn: boolean): void {
    this.isLoogeado.set(isLoggedIn);
    localStorage.setItem('isLoogeado', JSON.stringify(isLoggedIn));
  }

  getLoginState(): boolean {
    const storedState = localStorage.getItem('isLoogeado');
    return storedState ? JSON.parse(storedState) : false; // False por defecto si no existe
  }

  setAceptarConsetimiento(aceptado: boolean): void {
    this.aceptadoConsetimiento.set(aceptado);
    localStorage.setItem('aceptadoConsetimiento', JSON.stringify(aceptado));
  }

  getAceptarConsetimiento(): boolean {
    const storedState = localStorage.getItem('aceptadoConsetimiento');
    return storedState ? JSON.parse(storedState) : false; // False por defecto si no existe
  }

  setNombre(nombre: string): void {
    this.nombre.set(nombre);
    localStorage.setItem('nombre', nombre);
  }

  getNombre(): string {
    const storedState = localStorage.getItem('nombre');
    return storedState ? storedState : ''; // False por defecto si no existe
  }
}
