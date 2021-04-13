import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { AuthService } from 'src/app/components/auth/auth.service';
import { TokenService } from 'src/app/components/auth/token.service';
import { ChatService } from 'src/app/components/chat/chat.service';
import { User } from 'src/app/provider/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  loggedInUser$: Observable<User>;
  notifications = [];
  msgNumber = 0;
  socket: any;

  logonUserId: string;
  temp = [];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService
  ) {
    this.socket = io(environment.serverAddress);
  }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.getLogonUserDetails();
    this.authService.getLogonUserDetails().subscribe((user: User) => {
      if (user._id !== '-1') {
        this.notifications = user.chatList;
        this.logonUserId = user._id;
        this.checkIfRead(this.notifications);
      }
    });
  }

  checkIfRead(arr) {
    // let checkArr = [];
    arr?.forEach(item => {
      const receiver = item.msgId.message[item.msgId.message.length - 1];
      if (!receiver.isRead) {
        // checkArr.push(1);
        this.msgNumber += 1;
      }
    });
  }

  logout() {
    this.tokenService.DeleteToken();
    this.authService.resetLogonUserDetails();
    this.router.navigate(['auth']);
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToChatPage(user: User) {
    this.router.navigate(['chat', user._id]);
    this.chatService.markMessagesAsRead(this.logonUserId, user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  getMessageDateString(data) {
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY'
    });
  }

}



