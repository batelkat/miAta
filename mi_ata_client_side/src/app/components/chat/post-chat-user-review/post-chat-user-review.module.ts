import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostChatUserReviewComponent } from './post-chat-user-review.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PostChatUserReviewComponent,
  ],
  exports: [PostChatUserReviewComponent]
})
export class PostChatUserReviewModule { }
