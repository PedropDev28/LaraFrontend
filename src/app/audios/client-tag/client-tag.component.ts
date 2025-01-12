import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { DbService } from '../../core/db.service';


@Component({
  selector: 'app-client-tag',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './client-tag.component.html',
  styleUrl: './client-tag.component.css',
})
export class ClientTagComponent {

  private dbService = inject(DbService);
  textoMenosAparecen: any = [];
  textoRandom: any = [];
  tagsMenosAparecen: any = [];
  tagsRandom: any = [];
  colores: any = ['bg-indigo-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-red-100', 'bg-pink-100', 'bg-purple-100', 'bg-gray-100', 'bg-indigo-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-pink-200', 'bg-purple-200', 'bg-gray-200', 'bg-indigo-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-red-300', 'bg-pink-300', 'bg-purple-300', 'bg-gray-300', 'bg-indigo-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-red-400', 'bg-pink-400', 'bg-purple-400', 'bg-gray-400', 'bg-indigo-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-pink-500', 'bg-purple-500', 'bg-gray-500', 'bg-indigo-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-red-600', 'bg-pink-600', 'bg-purple-600', 'bg-gray-600', 'bg-indigo-700', 'bg-blue-700', 'bg-green-700', 'bg-yellow-700', 'bg-red-700', 'bg-pink-700', 'bg-purple-700', 'bg-gray-700', 'bg-indigo-800', 'bg-blue-800', 'bg-green-800', 'bg-yellow-800', 'bg-red-800', 'bg-pink-800', 'bg-purple-800', 'bg-gray-800', 'bg-indigo-900', 'bg-blue-900', 'bg-green-900', 'bg-yellow-900', 'bg-red-900', 'bg-pink-900', 'bg-purple-900', 'bg-gray-900'];
  coloresText: any = ['text-indigo-100', 'text-blue-100', 'text-green-100', 'text-yellow-100', 'text-red-100', 'text-pink-100', 'text-purple-100', 'text-gray-100', 'text-indigo-200', 'text-blue-200', 'text-green-200', 'text-yellow-200', 'text-red-200', 'text-pink-200', 'text-purple-200', 'text-gray-200', 'text-indigo-300', 'text-blue-300', 'text-green-300', 'text-yellow-300', 'text-red-300', 'text-pink-300', 'text-purple-300', 'text-gray-300', 'text-indigo-400', 'text-blue-400', 'text-green-400', 'text-yellow-400', 'text-red-400', 'text-pink-400', 'text-purple-400', 'text-gray-400', 'text-indigo-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-red-500', 'text-pink-500', 'text-purple-500', 'text-gray-500', 'text-indigo-600', 'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-red-600', 'text-pink-600', 'text-purple-600', 'text-gray-600', 'text-indigo-700', 'text-blue-700', 'text-green-700', 'text-yellow-700', 'text-red-700', 'text-pink-700', 'text-purple-700', 'text-gray-700', 'text-indigo-800', 'text-blue-800', 'text-green-800', 'text-yellow-800', 'text-red-800', 'text-pink-800', 'text-purple-800', 'text-gray-800', 'text-indigo-900', 'text-blue-900', 'text-green-900', 'text-yellow-900', 'text-red-900', 'text-pink-900', 'text-purple-900', 'text-gray-900'];
  colorText: any = this.coloresText[Math.floor(Math.random() * this.coloresText.length)];
  color: any = this.colores[Math.floor(Math.random() * this.colores.length)];

  ngOnInit(): void {
    this.dbService.getTagsLess().subscribe((tags: any) => {
      console.log(tags);
      for (let tag of tags) {
        this.tagsMenosAparecen.push({
          tag: tag.texto.tag,
          texto: tag.texto.texto,
        });
      }

    });
    this.dbService.getTagsRandom().subscribe((tags: any) => {
      console.log(tags);
      for (let tag of tags) {
        this.tagsRandom.push({
          tag: tag.texto.tag,
          texto: tag.texto.texto,
        });
      }
    });
  }
 
}
