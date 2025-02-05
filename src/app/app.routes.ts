import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminIndexComponent } from './pages/admin/admin-index/admin-index.component';
import { AdminPhrasesComponent } from './pages/admin/admin-phrases/admin-phrases.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { ClientIndexComponent } from './pages/client/client-index/client-index.component';
import { ClientRecordAudioComponent } from './pages/client/client-record-audio/client-record-audio.component';
import { ClientViewTagsComponent } from './pages/client/client-view-tags/client-view-tags.component';
import { clientGuard } from './guards/client.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent, 'pathMatch': 'full'},
    {path: 'inicioCliente', component: ClientIndexComponent, canActivate: [clientGuard]},
    {path: 'view-tags', component: ClientViewTagsComponent, canActivate: [clientGuard]},
    {path: 'record-audio', component: ClientRecordAudioComponent, canActivate: [clientGuard]},
];
