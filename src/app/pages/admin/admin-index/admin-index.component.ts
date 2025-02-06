import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import { NavbarComponent } from '../../../components/navbar/navbar.component';

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
  selector: 'app-admin-index',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css'
})
export class AdminIndexComponent {
  activeTab: "phrases" | "users" = "phrases"
  phrases: any[] = []
  users: any[] = []
  searchTerm = ""
  selectedCategory = "all"
  tabs: ('phrases' | 'users')[] = ['phrases', 'users'];

  ngOnInit() {
    // Simular datos de ejemplo
    this.phrases = this.generatePhrases()
    this.users = this.generateUsers()
  }

  private generatePhrases(): any[] {
    const categories = ["General", "Técnico", "Comercial", "Soporte"]
    const tags = ["Importante", "Urgente", "Nueva", "Revisada", "En proceso"]

    return Array.from({ length: 12 }, (_, i) => ({
      id: `phrase-${i + 1}`,
      text: `Frase de ejemplo ${i + 1} para demostración del sistema`,
      createdAt: new Date(Date.now() - Math.random() * 10000000000),
      recordingsCount: Math.floor(Math.random() * 100),
      category: categories[Math.floor(Math.random() * categories.length)],
      status: ["active", "pending", "archived"][Math.floor(Math.random() * 3)] as "active" | "pending" | "archived",
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => tags[Math.floor(Math.random() * tags.length)],
      ),
    }))
  }

  private generateUsers(): any[] {
    const roles = ["Admin", "Editor", "Usuario"]
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"]

    return Array.from({ length: 8 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `Usuario ${i + 1}`,
      email: `usuario${i + 1}@ejemplo.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      lastActive: new Date(Date.now() - Math.random() * 1000000000),
      recordingsCount: Math.floor(Math.random() * 50),
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
    }))
  }

  getFilteredItems() {
    const items = this.activeTab === "phrases" ? this.phrases : this.users
    return items.filter((item) => {
      const searchMatch =
        this.activeTab === "phrases"
          ? (item as any).text.toLowerCase().includes(this.searchTerm.toLowerCase())
          : (item as any).name.toLowerCase().includes(this.searchTerm.toLowerCase())

      if (this.selectedCategory === "all") return searchMatch

      return this.activeTab === "phrases"
        ? (item as any).category === this.selectedCategory && searchMatch
        : (item as any).role === this.selectedCategory && searchMatch
    })
  }

  getCategories() {
    return this.activeTab === "phrases"
      ? ["General", "Técnico", "Comercial", "Soporte"]
      : ["Admin", "Editor", "Usuario"]
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  getStatusColor(status: string): string {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    }
    return colors[status as keyof typeof colors] || colors.pending
  }
}
