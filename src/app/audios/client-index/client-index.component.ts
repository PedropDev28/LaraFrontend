import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { DbService } from '../../core/db.service';
import { Usuario } from '../../models/usuario';
import { CommonService } from '../../common/common.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-client-index',
  standalone: true,
  imports: [RouterLinkWithHref, NavbarComponent],
  templateUrl: './client-index.component.html',
  styleUrl: './client-index.component.css',
})
export class ClientIndexComponent {
  modal: any = document.getElementById('my_modal_1');
  private commonService = inject(CommonService);
  Usuarios: Usuario[] = [];
  nombre: string = this.commonService.getNombre();

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    this.modal = document.getElementById('my_modal_1');
    if (!this.commonService.getAceptarConsetimiento()) {
      if (this.modal) {
        this.modal.showModal();
      }
    }

    this.commonService.loginState$.subscribe((state: any) => {
      if (state) {
        this.nombre = this.commonService.getNombre();
      }
    });
  }

  aceptarConsentimiento() {
    this.commonService.setAceptarConsetimiento(true);
    this.commonService.setLoginState(true);
  }
  
}
