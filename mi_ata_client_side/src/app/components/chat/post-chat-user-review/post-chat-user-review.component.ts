import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren("top") topBtns: QueryList<ElementRef>;
  @ViewChildren("btm") btmBtns: QueryList<ElementRef>;

  constructor(public dialogRef: MatDialogRef<PostChatUserReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {

  }

  gradeUser(): void {
    this.dialogRef.close(this.reviewResult);
  }

  topButtonPressed(id): void {
    this.topBtns.forEach(btn => {
      if (btn.nativeElement.innerText === id + '' || (btn.nativeElement.innerText === 'לא רלוונטי' && id == 0)) {
        btn.nativeElement.setAttribute('class', 'active review-button')
      }
      else {
        btn.nativeElement.removeAttribute('class');
        btn.nativeElement.setAttribute('class', 'review-button')
      }
    })
    // Array.from(document.getElementsByClassName('top-btns')).forEach(topBtn => {
    //   if(topBtn.innerHTML === id+'')


    // })
  }

  btmButtonPressed(id): void {
    this.btmBtns.forEach(btn => {
      if (btn.nativeElement.innerText === id + '' || (btn.nativeElement.innerText === 'לא רלוונטי' && id == 0)) {
        btn.nativeElement.setAttribute('class', 'active review-button')
      }
      else {
        btn.nativeElement.removeAttribute('class');
        btn.nativeElement.setAttribute('class', 'review-button')
      }
    })
  }

}
