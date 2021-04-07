import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/provider/models/user.model';
import { UserReviewResult } from '../models/user-review-result.model';

@Component({
  selector: 'app-post-chat-user-review',
  templateUrl: './post-chat-user-review.component.html',
  styleUrls: ['./post-chat-user-review.component.scss']
})
export class PostChatUserReviewComponent implements OnInit {

  reviewResult: UserReviewResult = { agreement: 0, niceLevel: 0 };

  constructor(public dialogRef: MatDialogRef<PostChatUserReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {

  }

  gradeUser(): void {
    this.dialogRef.close(this.reviewResult);
  }

}
