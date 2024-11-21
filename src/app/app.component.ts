import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ClientTagComponent } from './audios/client-tag/client-tag.component';
import { CommonService } from './common/common.service';
import { DbService } from './core/db.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ClientTagComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LaraFrontend';
  isLogged = false;
  private dbService = inject(DbService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dbService.checkAuthentication().subscribe((response: any) => {
      if (response) {
        console.log(response);
      }
    });
  }
}
