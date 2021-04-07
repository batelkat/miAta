import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PeopleComponent } from './people.component';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule ],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
