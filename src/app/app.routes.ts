import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminIndexComponent } from './pages/admin/admin-index/admin-index.component';
import { AdminPhrasesComponent } from './pages/admin/admin-phrases/admin-phrases.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { ClientIndexComponent } from './pages/client/client-index/client-index.component';
import { ClientRecordAudioComponent } from './pages/client/client-record-audio/client-record-audio.component';
import { ClientViewTagsComponent } from './pages/client/client-view-tags/client-view-tags.component';
import { clientGuard } from './guards/client.guard';
import { ConsentComponent } from './pages/consent/consent.component';
import { adminGuard } from './guards/admin.guard';
import { technicianGuard } from './guards/technician.guard';
import { TechnicianIndexComponent } from './pages/technician/technician-index/technician-index.component';
import { TechnicianPhrasesComponent } from './pages/technician/technician-phrases/technician-phrases.component';
import { TechnicianUsersComponent } from './pages/technician/technician-users/technician-users.component';

export const routes: Routes = [
    {path: '', component: LoginComponent, 'pathMatch': 'full'},
    {path: 'consentimiento', component: ConsentComponent, canActivate: [clientGuard, adminGuard, technicianGuard]},
    {path: 'inicioCliente', component: ClientIndexComponent, canActivate: [clientGuard]},
    {path: 'view-tags', component: ClientViewTagsComponent, canActivate: [clientGuard]},
    {path: 'record-audio', component: ClientRecordAudioComponent, canActivate: [clientGuard]},
    {path: 'inicioAdmin', component: AdminIndexComponent, canActivate: [adminGuard]},
    {path: 'phrasesAdmin', component: AdminPhrasesComponent, canActivate: [adminGuard]},
    {path: 'usersAdmin', component: AdminUsersComponent, canActivate: [adminGuard]},
    {path: 'inicioTech', component: TechnicianIndexComponent, canActivate: [technicianGuard]},
    {path: 'phrasesTech', component: TechnicianPhrasesComponent, canActivate: [technicianGuard]},
    {path: 'userTech', component: TechnicianUsersComponent, canActivate: [technicianGuard]}
];
