import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatMessageComponent } from './chat-message.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ChatMessageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule
  ],
  exports: [ChatMessageComponent]
})
export class ChatMessageModule { }
