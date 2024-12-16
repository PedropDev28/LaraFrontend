import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  loginState$: any;
  aceptadoConsetimiento$: any;
  user$: any;
  private aceptadoConsetimiento: BehaviorSubject<boolean>;
  private isLoogeado: BehaviorSubject<boolean>;
  private user: BehaviorSubject<any>;

  constructor(private cookieService: CookieService) {
    this.isLoogeado = new BehaviorSubject<boolean>(
      this.cookieService.get('token') ? true : false
    );

    this.aceptadoConsetimiento = new BehaviorSubject<boolean>(
      this.getAceptarConsetimiento()
    );

    this.user = new BehaviorSubject<any>(this.getUser());

    this.loginState$ = this.isLoogeado.asObservable();
    this.aceptadoConsetimiento$ = this.aceptadoConsetimiento.asObservable();
    this.user$ = this.user.asObservable();
  }

  nombre = signal('');

  setLoginState(isLoggedIn: boolean): void {
    console.log('Estoy cambiando el estado');
    this.isLoogeado.next(isLoggedIn);
  }

  getLoginState(): boolean {
    console.log('Estoy obteniendo el estado');
    return this.isLoogeado.value;
  }

  setAceptarConsetimiento(aceptado: boolean): void {
    this.aceptadoConsetimiento.next(aceptado);
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

  setToken(token: string): void {
    console.log('Estoy aqui');
    this.cookieService.set('token', token);
    console.log(this.cookieService.get('token'));
  }

  deleteToken(): void {
    this.cookieService.delete('token');
  }

  setUser(user: Usuario): void {
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Usuario {
    const storedState = localStorage.getItem('user');
    return storedState ? JSON.parse(storedState) : null; // False por defecto si no existe
  }
}
