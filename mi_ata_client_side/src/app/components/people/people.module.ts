import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { PeopleRoutingModule } from './people-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenService } from '../auth/token.service';
import { AuthGuard } from '../auth/auth.guard';



@NgModule({
  declarations: [PeopleComponent],
  imports: [
    CommonModule,
    SharedModule,
    PeopleRoutingModule,
  ],
  exports: [PeopleComponent],
  providers: [TokenService]
})
export class PeopleModule { }
