import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../core/db.service';
import { CommonService } from '../../common/common.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private dbService = inject(DbService);
  errorMensaje = signal('');
  commonService = inject(CommonService);

  

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
      this.errorMensaje.set('Contraseña invalida');
    } else {
      this.errorMensaje.set('');
    }
  }

  comprobarEmail() {
    if (this.emailControl.invalid) {
      this.errorMensaje.set('Email invalido');
    } else {
      this.errorMensaje.set('');
    }
  }

  constructor(private router: Router, private cookieService: CookieService) {}

  login() {
    this.dbService
      .login(this.emailControl.value, this.passwordControl.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message === 'Login successful') {
            //Guardar token en una cookie
            console.log("Estoy aqui");
            this.commonService.setToken(response.token);
            this.router.navigate(['inicio']);
            this.commonService.setUser(response.user);
            console.log(this.commonService.getUser());
            console.log(response);
          } else {
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
    if(this.cookieService.get('token')) {
      console.log("Estoy aqui");
      this.router.navigate(['inicio']);
      this.commonService.setLoginState(true);
      
    }else{
      this.router.navigate(['']);
    }
  }

}
