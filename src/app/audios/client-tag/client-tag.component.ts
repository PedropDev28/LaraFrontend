import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-client-tag',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './client-tag.component.html',
  styleUrl: './client-tag.component.css',
})
export class ClientTagComponent {
  modal: any = document.getElementById('my_modal_1');
  
  ngAfterViewInit(): void {
    this.modal = document.getElementById('my_modal_1');
    if (this.modal) {
      this.modal.showModal();  // Mostrar el modal
    }
  }

}
