import { Component, inject, signal } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { DbService } from '../../core/db.service';
import { Usuario } from '../../models/usuario';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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

  constructor(private router: Router) { }

  login() {
    this.dbService.getUsuarioByEmailAndPassword(this.emailControl.value, this.passwordControl.value).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.commonService.setLoginState(true);
        this.router.navigate(['inicio']);
      }
    },
      (error) => {
        console.log(error);
        this.errorMensaje.set('Usuario o contraseña incorrectos');
      });
  }
}
