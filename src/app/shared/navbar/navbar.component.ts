import { Component, inject } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private commonService = inject(CommonService);
  constructor(private router: Router, private cookieService: CookieService) { }

  logout() {
    // Eliminar token de la cookie
    this.commonService.deleteToken();
    this.commonService.setLoginState(false);
    this.router.navigate(['']);
  }

}
