import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ClientTagComponent } from './audios/client-tag/client-tag.component';
import { CommonService } from './common/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ClientTagComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LaraFrontend';
  commonService = inject(CommonService);
  isLogged = this.commonService.getLoginState();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.commonService.getLoginState()) {
      this.router.navigate(['inicio']);
    }else {
      this.router.navigate(['']);
    }
    
  }
}
