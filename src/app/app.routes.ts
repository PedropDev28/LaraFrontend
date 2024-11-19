import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClientTagComponent } from './audios/client-tag/client-tag.component';

export const routes: Routes = [
    {path: '', component: LoginComponent, 'pathMatch': 'full'},
    {path: 'inicio', component: ClientTagComponent},
];
