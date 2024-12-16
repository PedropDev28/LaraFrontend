import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ClientTagComponent } from './audios/client-tag/client-tag.component';
import { CommonService } from './common/common.service';
import { DbService } from './core/db.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LaraFrontend';

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {

    // if (this.cookieService.get('token')) {
    //   this.router.navigate(['inicio']);
    // } else {
    //   this.router.navigate(['']);
    // }
  }
}
