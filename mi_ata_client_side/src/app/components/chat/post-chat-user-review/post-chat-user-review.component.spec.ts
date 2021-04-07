import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostChatUserReviewComponent } from './post-chat-user-review.component';

describe('PostChatUserReviewComponent', () => {
  let component: PostChatUserReviewComponent;
  let fixture: ComponentFixture<PostChatUserReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostChatUserReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostChatUserReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
