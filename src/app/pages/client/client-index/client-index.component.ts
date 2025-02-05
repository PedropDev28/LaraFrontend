import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-client-index',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './client-index.component.html',
  styleUrl: './client-index.component.css'
})
export class ClientIndexComponent {
  
}
