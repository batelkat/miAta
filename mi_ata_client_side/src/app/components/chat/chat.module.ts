import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TokenService } from '../auth/token.service';
import { SharedModule } from './../../shared/shared.module';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { QuestionsComponent } from './questions/questions.component';
import { PostChatUserReviewComponent } from './post-chat-user-review/post-chat-user-review.component';
import { MatButtonModule } from '@angular/material/button';
// import { SatPopoverModule } from '@ncstate/sat-popover';




@NgModule({
  declarations: [
    ChatComponent,
    ChatMessageComponent,
    PostChatUserReviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChatMessageModule,
    ChatRoutingModule,
    MatButtonModule,
    // SatPopoverModule
  ],
  providers: [TokenService]
  // exports: [ChatComponent]
})
export class ChatModule { }
