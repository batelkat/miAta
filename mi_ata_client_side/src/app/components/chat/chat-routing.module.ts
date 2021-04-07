import { ChatComponent } from './chat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CanDeactivateGuardService } from 'src/app/provider/services/can-deactivate-guard.service';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '/chat/:userId',
    component: ChatComponent,
    canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule ],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
