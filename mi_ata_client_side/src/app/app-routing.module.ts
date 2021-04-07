import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { AuthTabsComponent } from './components/auth/auth-tabs/auth-tabs.component';
import { AuthGuard } from './components/auth/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { PeopleComponent } from './components/people/people.component';
import { CanDeactivateGuardService } from './provider/services/can-deactivate-guard.service';


const routes: Routes = [
  { path: 'auth', component: AuthTabsComponent },

  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:userId',
    component: ChatComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuardService]
  },
  {
    path: 'setting',
    component: AdminSettingComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
