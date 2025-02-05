import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DbService } from '../../../core/db.service';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-client-view-tags',
  standalone: true,
  imports: [NgClass, NgStyle, NavbarComponent],
  templateUrl: './client-view-tags.component.html',
  styleUrl: './client-view-tags.component.css'
})
export class ClientViewTagsComponent {
  @ViewChild('lessRecordedCarousel') lessRecordedCarousel!: ElementRef;
  @ViewChild('randomCarousel') randomCarousel!: ElementRef;

  searchControl = new FormControl('');
  filteredTags: any[] = [];
  selectedCategory: string = 'all';
  private dbService = inject(DbService);
  lessRecordedTags: any[] = [];
  randomTags: any[] = [];


  allTags: any[] = [];

  trendingTags: any[] = this.allTags.sort((a, b) => b.count - a.count).slice(0, 5);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Obtener todas las etiquetas
    this.dbService.getTwentyTags().subscribe((tags: any[]) => {
      console.log(tags);
      this.allTags = tags;
      console.log(this.allTags);
      this.cdr.detectChanges();
    });
  
    // Obtener etiquetas menos registradas
    this.dbService.getTagsLess().subscribe((tags: any[]) => {
      console.log(tags);
      this.lessRecordedTags = tags;
      this.cdr.detectChanges();
    });
  
    // Obtener etiquetas aleatorias
    this.dbService.getTagsRandom().subscribe((tags: any[]) => {
      console.log(tags);
      this.randomTags = tags;
      this.cdr.detectChanges();
    });
  
    // Suscribirse a cambios en el input de búsqueda
  }
  

ngAfterViewInit() {
   // Esperar a que los datos se carguen
}


  startCarousel(carouselElement: HTMLElement, tags: any[]) {
    
  }

  getTotalTagCount(): number {
    return this.allTags.reduce((sum, tag) => sum + tag.count, 0);
  }

  getMaxTagCount(): number {
    return Math.max(...this.allTags.map(tag => tag.count));
  }
}
