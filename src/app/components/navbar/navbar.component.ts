import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AccessibilitySidebarComponent } from '../../pages/client/accesibility-sidebar/accesibility-sidebar.component';
import { DbService } from '../../core/db.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref, AccessibilitySidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  isAccessibilitySidebarOpen = false;
  private dbService = inject(DbService);

  constructor(private router: Router) {}
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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
