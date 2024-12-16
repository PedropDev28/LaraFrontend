import { Component, inject } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  private commonService = inject(CommonService);
  user = this.commonService.getUser();
}
