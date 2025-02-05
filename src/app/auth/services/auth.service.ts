import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<any>({} as any);
  usuario$ = this.usuarioSubject.asObservable();
  isConnect: boolean = false;

  mensajeError = signal('');

  getUsuario(): any {
    return this.usuarioSubject.value;
  }

  setUsuario(usuario: any): void {
    this.usuarioSubject.next(usuario);
  }
}
