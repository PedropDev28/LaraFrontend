import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AccessibilitySidebarComponent } from '../../pages/client/accesibility-sidebar/accesibility-sidebar.component';
import { DbService } from '../../core/db.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref, AccessibilitySidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = false;
  isAccessibilitySidebarOpen = false;
  private dbService = inject(DbService);
  usuario: any;

  constructor(private router: Router) {}
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const response = firstValueFrom(this.dbService.getCurrentUser()); // Esperamos la respuesta

    console.log('Usuario autenticado:', response);
    this.usuario = response;
  }

  toggleAccessibilitySidebar(): void {
    this.isAccessibilitySidebarOpen = !this.isAccessibilitySidebarOpen;
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.dbService.logout().subscribe((response) => {
      console.log(response);
    });
  }
}
