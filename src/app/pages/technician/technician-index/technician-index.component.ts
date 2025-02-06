import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { DbService } from '../../../core/db.service';
import { AuthService } from '../../../auth/services/auth.service';

const cardAnimation = trigger("cardAnimation", [
  transition("* => *", [
    query(
      ":enter",
      [
        style({
          opacity: 0,
          transform: "perspective(1000px) rotateY(10deg) translateX(50px) translateZ(-100px)",
        }),
        stagger(100, [
          animate(
            "0.6s cubic-bezier(0.35, 0, 0.25, 1)",
            style({
              opacity: 1,
              transform: "perspective(1000px) rotateY(0) translateX(0) translateZ(0)",
            }),
          ),
        ]),
      ],
      { optional: true },
    ),
  ]),
])
@Component({
  selector: 'app-technician-index',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './technician-index.component.html',
  styleUrl: './technician-index.component.css'
})
export class TechnicianIndexComponent {
  activeTab: "phrases" | "users" = "phrases"
  phrases: any[] = []
  users: any[] = []
  searchTerm = ""
  selectedCategory = "all"
  tabs: ('phrases' | 'users')[] = ['phrases', 'users'];
  private dbService = inject(DbService);
  private authService = inject(AuthService);
  usuarioConectado: any;

  ngOnInit() {
    this.authService.usuario$.subscribe(usuario => this.usuarioConectado = usuario);
    this.dbService.getUsersByParent(this.usuarioConectado.mail).subscribe((data: any) => {
      this.users = data;
      for (let i = 0; i < this.users.length; i++) {
        this.dbService.getAudiosByUser(this.users[i].mail).subscribe((data: any) => {
          console.log(data);
          if(data.length > 0) {
          this.phrases.push(data);
          console.log(this.phrases);
          }
        });
      }
    });
    console.log(this.phrases);

  }

  formatDate(dateString: string): string {
    // Recorta los milisegundos a 3 dígitos si es necesario
    const dateNormalized = dateString.replace(/(\.\d{3})\d*/, '$1');
    const date = new Date(dateNormalized); // Convierte la cadena ISO en un objeto Date
  
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }
}
