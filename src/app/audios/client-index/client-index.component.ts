import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { DbService } from '../../core/db.service';
import { Usuario } from '../../models/usuario';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-client-index',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './client-index.component.html',
  styleUrl: './client-index.component.css',
})
export class ClientIndexComponent {
  modal: any = document.getElementById('my_modal_1');
  private dbService = inject(DbService);
  private commonService = inject(CommonService);
  aceptadoConsetimiento = this.commonService.aceptadoConsetimiento;
  Usuarios: Usuario[] = [];
  nombre: string = this.commonService.getNombre();

  constructor(private router: Router) {
    this.dbService.getUsuarios().then((data) => {
      this.Usuarios = data;
    });
    console.log(this.aceptadoConsetimiento());
  }

  ngAfterViewInit(): void {
    this.modal = document.getElementById('my_modal_1');
    if (!this.commonService.getAceptarConsetimiento()) {
      if (this.modal) {
        this.modal.showModal();
      }
    }
  }

  aceptarConsentimiento() {
    this.commonService.setAceptarConsetimiento(true);
    this.commonService.setLoginState(true);
    //recargar la pagina
    window.location.reload();
  }
}
