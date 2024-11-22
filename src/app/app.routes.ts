import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClientTagComponent } from './audios/client-tag/client-tag.component';
import { ClientIndexComponent } from './audios/client-index/client-index.component';
import { ClientTextComponent } from './audios/client-text/client-text.component';
import { UpdateComponent } from './users/update/update.component';

export const routes: Routes = [
    {path: '', component: LoginComponent, 'pathMatch': 'full'},
    {path: 'inicio', component: ClientIndexComponent},
    {path: 'tag', component: ClientTagComponent},
    {path: 'audio', component: ClientTextComponent},
    {path: 'profile', component: UpdateComponent}
];
