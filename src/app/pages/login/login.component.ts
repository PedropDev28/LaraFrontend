import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../core/db.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private dbService = inject(DbService);
  private authService = inject(AuthService);
  errorMensaje = signal('');
  errorMensajeEmail = signal('');
  errorMensajePassword = signal('');
  usuario: any;
  isLoaded = false;

  passwordControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  comprobarPassword() {
    if (this.passwordControl.invalid) {
      this.errorMensajePassword.set('Contraseña invalida');
    } else {
      this.errorMensajePassword.set('');
    }
  }

  comprobarEmail() {
    if (this.emailControl.invalid) {
      this.errorMensajeEmail.set('Email invalido');
    } else {
      this.errorMensajeEmail.set('');
    }
  }

  constructor(private router: Router) {}

  login() {
    this.dbService
      .login(this.emailControl.value, this.passwordControl.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Login successful') {
            // guardar token en localstorage
            localStorage.setItem('token', response.token);
            this.authService.setUsuario(response.user);
            if (response.user.rol === 'cliente') {
              console.log('cliente');
              this.router.navigate(['/inicioCliente']);
            } else if (response.user.rol === 'tecnico') {
                this.router.navigate(['/inicioTecnico']);
            } else if (response.user.rol === 'admin') {
                this.router.navigate(['/inicioAdmin']);
            } else {
                this.router.navigate(['/']);
            }
          } else if (response.status === 401) {
            this.errorMensaje.set('Usuario o contraseña incorrectos');
          }
        },
        (error) => {
          console.log(error);
          this.errorMensaje.set('Usuario o contraseña incorrectos');
        }
      );
  }

  showPassword() {
    const password = document.getElementById('password');
    if (password) {
      if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text');
      } else {
        password.setAttribute('type', 'password');
      }
    }
  }

  ngOnInit(): void {
    this.authService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
}
