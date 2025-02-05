import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DbService } from './core/db.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LaraFrontend';
  private authService = inject(AuthService);
  private dbService = inject(DbService);
  usuario: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.dbService.getCurrentUser().subscribe({
        next: (response) => {
          console.log('Usuario autenticado:', response);
          this.authService.setUsuario(response);
          this.authService.usuario$.subscribe((usuario) => {
            this.usuario = usuario;
          });
          if(this.usuario.rol === 'cliente'){
            this.router.navigate(['/view-tags']);
          }
        },
        error: (err) => {
          console.error('Error al recuperar usuario:', err);
          this.router.navigate(['/']);
        },
      });
    }
  }
  
}
