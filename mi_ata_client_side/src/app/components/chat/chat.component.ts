import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
// import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from '../auth/token.service';
import { UsersService } from 'src/app/provider/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/provider/models/user.model';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostChatUserReviewComponent } from './post-chat-user-review/post-chat-user-review.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  tabElement: any;
  online_users = [];
  socket: any;
  user: any;
  partnerData: User;


  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.user = this.tokenService.GetPayload();

    this.route.params.subscribe(params => {

      this.GetPartnerData(params.userId);
      // this.socket.on('refreshPage', () => {
      //   this.GetPartnerData(params.userId);
      // });

    });
    // this.socket.on('online', { room: 'global', user: this.user.username });
  }

  GetPartnerData(userId: string) {
    this.usersService.GetUserById(userId).subscribe(data => {
      this.partnerData = data.result;
      // console.log("file: chat.component.ts ~ line 51 ~ this.usersService.GetUserById ~ this.partnerData", this.partnerData)
    });
  }

  openSurveyPopup() {
    Swal.fire({
      icon: 'info',
      html:
        'נשמח אם תשתתף בשאלון אנונימי' +
        '<a href="//sweetalert2.github.io"> לשאלון לחץ כאן</a> '
      ,
      showCloseButton: true,
      showConfirmButton: false
    });
  }

  openSurveyDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '50vw';
    dialogConfig.data = this.partnerData;
    const dialogRef = this.dialog.open(PostChatUserReviewComponent, dialogConfig);
    var sub = dialogRef.afterClosed().subscribe((result: boolean) => {
      sub.unsubscribe();
      if (result) {
        //If user answered
      }
    });
  }

  canDeactivate() {
    this.openSurveyDialog();
    return true;
    // if (!this.usersService.surveyOpened) {
    //   this.openSurveyPopup();
    //   this.usersService.surveyOpened = true;
    // }
  }

}
