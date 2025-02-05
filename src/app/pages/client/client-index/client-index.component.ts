import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-client-index',
  standalone: true,
  imports: [NavbarComponent, RouterLinkWithHref],
  templateUrl: './client-index.component.html',
  styleUrl: './client-index.component.css'
})
export class ClientIndexComponent {
  
}
